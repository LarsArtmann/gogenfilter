import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const docs = await getCollection("docs");
const docPages = Object.fromEntries(docs.map(({ data, id }) => [id, { data }]));

const pages = {
  ...docPages,
  "home": {
    data: {
      title: "gogenfilter",
      description: "Detect and filter auto-generated Go code files from 11 generators. Built for linters and static analysis.",
    },
  },
};

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: "slug",
  getImageOptions: (_path, page) => ({
    title: page.data.title,
    description: page.data.description,
    bgGradient: [[12, 10, 9]],
    border: { color: [34, 211, 238], width: 4 },
    padding: 80,
  }),
});
