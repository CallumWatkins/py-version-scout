export type OutputProject = {
  name: string;
};

export type ProjectsResult = {
  projects: OutputProject[];
  skippedLines: { line: number; content: string }[];
};
