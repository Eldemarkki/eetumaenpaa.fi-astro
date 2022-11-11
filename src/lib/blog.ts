import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = join(process.cwd(), "src", "pages", "blog");

export const getAllPostSlugsUnsorted = () => {
  const filenames = readdirSync(postsDirectory);
  const slugs = filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map(fn => fn.replace(".mdx", ""));
  return slugs;
}

export const getAllPostsUnsorted = () => {
  const slugs = getAllPostSlugsUnsorted();
  const posts = slugs.map(async slug => await getPostBySlug(slug));
  return Promise.all(posts);
};

export const getPostBySlug = async (slug: string) => {
  const fullPath = join(postsDirectory, `${slug}.mdx`);
  if (!existsSync(fullPath)) {
    throw new Error(`Could not locate blog post: ${slug}`);
  }

  const filecontent = readFileSync(fullPath, "utf8");
  const mdxSource = await serialize(filecontent, { parseFrontmatter: true });

  if (!mdxSource.frontmatter) {
    throw new Error(`Could not load frontmatter for blog post: ${slug}`);
  }

  return {
    mdxSource,
    frontmatter: {
      slug: String(mdxSource.frontmatter["slug"]),
      title: String(mdxSource.frontmatter["title"]),
      releaseDate: new Date(mdxSource.frontmatter["releaseDate"] || 0).getTime(),
      excerpt: String(mdxSource.frontmatter["excerpt"]),
      type: "blog",
    }
  };
};
