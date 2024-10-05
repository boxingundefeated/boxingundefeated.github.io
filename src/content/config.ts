// Import necessary modules
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Define the GET function as an async function
export async function GET(context) {
  // Retrieve the collection named 'blog'
  const blog = await getCollection('blog');

  // Generate the RSS feed
  return rss({
    title: 'Boxing Undefeated',
    description: 'All things boxing',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      author: post.data.author,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      content: post.body, // Assuming you have the content of each post in post.body
      link: `/posts/${post.slug}/`, // Make sure the link structure matches your routing
    })),
  });
}
