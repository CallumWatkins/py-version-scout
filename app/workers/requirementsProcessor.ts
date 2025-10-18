import type { OutputProject } from "~~/types/output";

async function processRequirement(name: string): Promise<OutputProject> {
  const response = await fetch(`https://pypi.org/pypi/${name}/json`);
  const data = await response.json();
  return {
    name: data.info.name,
  };
}

export async function processRequirements(requirementsText: string): Promise<OutputProject[]> {
  const names = requirementsText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split("==")[0]!.trim());

  const projects: OutputProject[] = await Promise.all(
    names.map(async (name) => {
      return await processRequirement(name);
    }),
  );

  return projects;
}
