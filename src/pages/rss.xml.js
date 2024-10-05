import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('post');
  const feedItems = posts.map((post) => ({
    title: post.data.title,
    link: `/${post.slug}/`,
    pubDate: post.data.publishDate,
    content: sanitizeHtml(parser.render(post.body)),
    ...post.frontmatter,
  }));

  return rss({
    title: 'Boxing Undefeated | Post Feed',
    description: 'Latest posts from Boxing Undefeated',
    site: context.site,
    items: feedItems,
  });
}
