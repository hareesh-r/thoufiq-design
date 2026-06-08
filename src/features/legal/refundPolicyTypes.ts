export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; lead?: string; items: string[]; outro?: string };

export type PolicySection = {
  title: string;
  blocks: PolicyBlock[];
};
