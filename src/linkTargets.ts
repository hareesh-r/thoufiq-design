/** Use on `<a>` when href may be off-site (opens new tab safely). */
export function newTabIfHttp(href: string): { target?: string; rel?: string } {
  if (/^https?:\/\//i.test(href)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}
