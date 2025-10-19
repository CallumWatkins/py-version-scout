export interface OutputProjectBase {
  name: string;
};

export interface OutputProjectFoundBase extends OutputProjectBase {
  type: "found";
  latestVersion: string;
};

export interface OutputProjectUpToDate extends OutputProjectFoundBase {
  status: "up-to-date";
};

export interface OutputProjectOutdated extends OutputProjectFoundBase {
  status: "outdated";
};

export interface OutputProjectUnpinned extends OutputProjectFoundBase {
  status: "unpinned";
};

export interface OutputProjectYanked extends OutputProjectFoundBase {
  status: "yanked";
  yankedReason: Nullable<string>;
};

export interface OutputProjectReleaseNotFound extends OutputProjectFoundBase {
  status: "release-not-found";
};

export type OutputProjectFound = OutputProjectUpToDate | OutputProjectOutdated | OutputProjectUnpinned | OutputProjectYanked | OutputProjectReleaseNotFound;

export interface OutputProjectNotFound extends OutputProjectBase {
  type: "not-found";
};

export type OutputProject = OutputProjectFound | OutputProjectNotFound;

export type ProjectsResult = {
  projects: OutputProject[];
  skippedLines: { line: number; content: string }[];
};
