import { parsePipRequirementsFile, type ProjectNameRequirementWithLocation } from "pip-requirements-js";
import type { OutputProject, ProjectsResult } from "~~/types/output";

type Requirement = {
  name: string;
  exactVersion?: string;
};

function normalizeProjectName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[-_.]+/g, "-");
}

async function processRequirement(requirement: Requirement): Promise<OutputProject> {
  const response = await fetch(`https://pypi.org/pypi/${requirement.name}/json`);
  if (!response.ok) {
    if (response.status === 404) {
      return {
        type: "not-found",
        name: requirement.name,
      };
    }
    throw new Error(`Failed to fetch project ${requirement.name}: ${response.statusText}`);
  }
  const data = await response.json();
  if (requirement.exactVersion == null) {
    return {
      type: "found",
      name: data.info.name,
      latestVersion: data.info.version,
      summary: data.info.summary,
      projectUrl: data.info.project_url,
      status: "unpinned",
    };
  }
  const exactRelease = data.releases[requirement.exactVersion];
  if (exactRelease == null) {
    return {
      type: "found",
      name: data.info.name,
      latestVersion: data.info.version,
      summary: data.info.summary,
      projectUrl: data.info.project_url,
      status: "release-not-found",
    };
  }
  if (exactRelease[0].yanked) {
    return {
      type: "found",
      name: data.info.name,
      latestVersion: data.info.version,
      summary: data.info.summary,
      projectUrl: data.info.project_url,
      status: "yanked",
      yankedReason: exactRelease[0].yanked_reason ?? null,
    };
  }
  if (requirement.exactVersion !== data.info.version) {
    return {
      type: "found",
      name: data.info.name,
      latestVersion: data.info.version,
      summary: data.info.summary,
      projectUrl: data.info.project_url,
      status: "outdated",
    };
  }
  return {
    type: "found",
    name: data.info.name,
    latestVersion: data.info.version,
    summary: data.info.summary,
    projectUrl: data.info.project_url,
    status: "up-to-date",
  };
}

export async function processRequirements(requirementsText: string): Promise<ProjectsResult> {
  const parsedRequirements = parsePipRequirementsFile(requirementsText, { includeLocations: true });
  const skippedLines: ProjectsResult["skippedLines"] = [];
  const requirements = parsedRequirements
    .filter((req): req is ProjectNameRequirementWithLocation => {
      if (req.data.type === "ProjectName") return true;
      const lineContent = requirementsText.substring(req.location.startIdx, req.location.endIdx);
      const lineNumber = requirementsText.substring(0, req.location.startIdx).split("\n").length;
      skippedLines.push({ line: lineNumber, content: lineContent });
      return false;
    })
    .map(req => ({
      name: normalizeProjectName(req.data.name.data),
      exactVersion: req.data.versionSpec?.find(s => s.data.operator.data === "==")?.data.version.data,
    }));

  const projects: OutputProject[] = await Promise.all(
    requirements.map(async (requirement) => {
      return await processRequirement(requirement);
    }),
  );

  return {
    projects,
    skippedLines,
  };
}
