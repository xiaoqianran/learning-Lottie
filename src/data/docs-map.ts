/**
 * 文档地图：LottieFiles / LottieDocs 官方 ⇄ 本站课
 * 官方 llms：https://developers.lottiefiles.com/llms.txt
 */
export type DocItem = {
  title: string;
  official: string;
  lessonSlug?: string;
  note?: string;
};

export type DocSection = {
  id: string;
  title: string;
  items: DocItem[];
};

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "official-llms",
    title: "官方 LLM 索引（有！）",
    items: [
      {
        title: "Developer Portal llms.txt",
        official: "https://developers.lottiefiles.com/llms.txt",
        lessonSlug: "ecosystem",
        note: "总索引",
      },
      {
        title: "dotLottie Web Players llms",
        official: "https://developers.lottiefiles.com/dotlottie-players-web-llms.txt",
        lessonSlug: "dotlottie-player",
      },
      {
        title: "dotLottie Mobile Players llms",
        official: "https://developers.lottiefiles.com/dotlottie-players-mobile-llms.txt",
        lessonSlug: "cross-platform",
      },
      {
        title: "dotLottie-JS llms",
        official: "https://developers.lottiefiles.com/dotlottiejs-llms.txt",
        lessonSlug: "dotlottie-js",
      },
    ],
  },
  {
    id: "format",
    title: "Format & Spec",
    items: [
      {
        title: "Lottie Documentation",
        official: "https://lottiefiles.github.io/lottie-docs/",
        lessonSlug: "json-structure",
      },
      {
        title: "Lottie Animation Community Spec",
        official: "https://lottie.github.io/lottie-spec/latest/",
        lessonSlug: "json-structure",
      },
      {
        title: "JSON Schema",
        official: "https://lottiefiles.github.io/lottie-docs/schema/",
        lessonSlug: "layer-types",
      },
      {
        title: "dotLottie v2 Spec",
        official: "https://dotlottie.io/spec/2.0/",
        lessonSlug: "dotlottie-intro",
      },
      {
        title: "dotLottie v1 Spec",
        official: "https://dotlottie.io/spec/1.0/",
        lessonSlug: "dotlottie-intro",
      },
    ],
  },
  {
    id: "playback",
    title: "Playback & Interact",
    items: [
      { title: "Play / loop / speed", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "playback" },
      { title: "Segments", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "segments" },
      { title: "Events", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "events" },
      { title: "Markers", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "markers" },
      { title: "Theming / slots", official: "https://dotlottie.io/spec/2.0/", lessonSlug: "theming" },
      { title: "State machines", official: "https://dotlottie.io/spec/2.0/", lessonSlug: "state-machine" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    items: [
      { title: "React integration", official: "https://developers.lottiefiles.com/dotlottie-players-web-llms.txt", lessonSlug: "react-lottie" },
      { title: "Performance / Worker", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "performance" },
      { title: "Accessibility", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "a11y" },
      { title: "reLottie", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "relottie" },
      { title: "MCP / AI", official: "https://developers.lottiefiles.com/llms.txt", lessonSlug: "mcp-ai" },
      { title: "Licensing", official: "https://lottiefiles.com", lessonSlug: "licensing" },
    ],
  },
];

export function docsCoverage() {
  const items = DOC_SECTIONS.flatMap((s) => s.items);
  const linked = items.filter((i) => i.lessonSlug).length;
  return { total: items.length, linked, pct: Math.round((linked / items.length) * 100) };
}
