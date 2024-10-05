import type { PaginateFunction } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry, ContentEntryMap } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from '~/utils/config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<keyof ContentEntryMap>): Promise<Post> => {
  const { id, slug: rawSlug = '', data, collection } = post;
  const { Content } = await post.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    seoTitle,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
    metaRobots,
  } = data;

  const slug = cleanSlug(String(rawSlug));
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(String(rawCategory)) : undefined;
  const tags = Array.isArray(rawTags) ? rawTags.map((tag: string) => cleanSlug(String(tag))) : [];

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    seoTitle: seoTitle,
    excerpt: excerpt,
    image: image,

    collection,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,
    metaRobots,

    Content: Content,
    // or 'content' in case you consume from API

    // readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const collections = ['post'];
  const allPosts: CollectionEntry<keyof ContentEntryMap>[] = [];

  for (const collection of collections) {
    try {
      const posts = await getCollection(collection as keyof ContentEntryMap);
      allPosts.push(...posts);
    } catch (error) {
      console.warn(`Warning: Collection "${collection}" does not exist or is empty.`);
    }
  }

  const normalizedPosts = allPosts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPostsByCollection = async ({
  count,
  collectionName = 'post',
}: {
  count?: number;
  collectionName: keyof ContentEntryMap;
}): Promise<Array<Post>> => {
  const _count = count || 200;
  const posts = await fetchPosts();

  console.log(`[DEBUG] Total posts fetched: ${posts.length}`);
  console.log(`[DEBUG] Filtering for collection: ${collectionName}`);

  const filteredPosts = posts.filter((post) => post.collection === collectionName);
  console.log(`[DEBUG] Posts in ${collectionName} collection: ${filteredPosts.length}`);

  const slicedPosts = filteredPosts.slice(0, _count);
  console.log(`[DEBUG] Returning ${slicedPosts.length} posts`);

  return slicedPosts;
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];

  const collections = ['post'];
  const posts = await fetchPosts();

  return collections.flatMap((collection: keyof ContentEntryMap) => {
    const filteredPosts = posts.filter((post) => post.collection === collection);

    const param = collection === 'post' ? 'post' : BLOG_BASE;
    const title = collection === 'post' ? 'post' : 'Blog';

    return paginate(filteredPosts, {
      params: { blog: param || undefined },
      pageSize: blogPostsPerPage,
      props: {
        title,
      },
    });
  });
};

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const categories = new Set<string>();
  posts.map((post) => {
    typeof post.category === 'string' && categories.add(post.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      posts.filter((post) => typeof post.category === 'string' && category === post.category.toLowerCase()),
      {
        params: { category: category, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const tags = new Set<string>();
  posts.map((post) => {
    Array.isArray(post.tags) && post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag },
      }
    )
  );
};
