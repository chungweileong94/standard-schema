import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";
import AnchorPlugin from "markdown-it-anchor";

declare global {
  var md: MarkdownIt;
}

async function initMarkdownParser() {
  if (globalThis.md) return globalThis.md;
  const md = MarkdownIt({
    html: true,
  });
  md.use(
    await Shiki({
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
    }),
  );
  md.use(AnchorPlugin);
  globalThis.md = md;
  return md;
}

export async function parseMarkdown(markdown: string) {
  const parser = await initMarkdownParser();
  return parser.render(markdown);
}
