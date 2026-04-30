import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const entries = await getCollection('docs');
const pages = Object.fromEntries(
  entries.map(({ data, id }) => [id, { data }])
);

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: 'slug',
  getImageOptions: (_path, page) => ({
    title: page.data.title,
    description: page.data.description,
    bgGradient: [[12, 10, 9]],
    border: { color: [34, 211, 238], width: 4 },
    padding: 80,
  }),
});
