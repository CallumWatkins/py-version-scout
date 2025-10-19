export interface OutputProjectBase {
  name: string;
};

export interface OutputProjectFound extends OutputProjectBase {
  type: "found";
  status: "up-to-date" | "outdated" | "unpinned" | "yanked" | "release-not-found";
};

export interface OutputProjectNotFound extends OutputProjectBase {
  type: "not-found";
};

export type OutputProject = OutputProjectFound | OutputProjectNotFound;

export type ProjectsResult = {
  projects: OutputProject[];
  skippedLines: { line: number; content: string }[];
};
