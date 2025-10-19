import type { Nullable } from "./common";

export interface PyPIResponse {
  info: PackageInfo;
  last_serial: number;
  releases: Record<string, ReleaseFile[]>;
  urls: ReleaseFile[];
  vulnerabilities: Vulnerability[];
}

export interface PackageInfo {
  author: Nullable<string>;
  author_email: string;
  bugtrack_url: Nullable<string>;
  classifiers: string[];
  description: string;
  description_content_type: Nullable<string>;
  docs_url: Nullable<string>;
  download_url: Nullable<string>;
  downloads: {
    last_day: number;
    last_month: number;
    last_week: number;
  };
  dynamic: Nullable<string[]>;
  home_page: Nullable<string>;
  keywords: Nullable<string>;
  license: Nullable<string>;
  license_expression: Nullable<string>;
  license_files: Nullable<string | string[]>;
  maintainer: Nullable<string>;
  maintainer_email: Nullable<string>;
  name: string;
  package_url: string;
  platform: Nullable<string>;
  project_url: string;
  project_urls: Record<string, string>;
  provides_extra: string[];
  release_url: string;
  requires_dist: string[] | null;
  requires_python: Nullable<string>;
  summary: string;
  version: string;
  yanked: boolean;
  yanked_reason: Nullable<string>;
}

export interface ReleaseFile {
  comment_text: Nullable<string>;
  digests: {
    blake2b_256: string;
    md5: string;
    sha256: string;
  };
  downloads: number;
  filename: string;
  has_sig: boolean;
  md5_digest: string;
  packagetype: string;
  python_version: string;
  requires_python: Nullable<string>;
  size: number;
  upload_time: string;
  upload_time_iso_8601: string;
  url: string;
  yanked: boolean;
  yanked_reason: Nullable<string>;
}

export interface Vulnerability {
  id?: string;
  details?: string;
  aliases?: string[];
  fixed_in?: string[];
  withdrawn?: Nullable<string>;

  [key: string]: unknown;
}
