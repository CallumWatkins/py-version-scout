import { parsePipRequirementsFile, type ProjectNameRequirementWithLocation } from "pip-requirements-js";
import type { OutputProject, ProjectsResult } from "~~/types/output";

type Requirement = {
  name: string;
  isExact: boolean;
};

async function processRequirement(requirement: Requirement): Promise<OutputProject> {
  const response = await fetch(`https://pypi.org/pypi/${requirement.name}/json`);
  const data = await response.json();
  return {
    name: data.info.name,
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
      name: req.data.name.data,
      isExact: req.data.versionSpec != null && req.data.versionSpec.some(s => s.data.operator.data === "=="),
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
