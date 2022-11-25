import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = join(process.cwd(), "src", "pages", "blog");
const projectsDirectory = join(process.cwd(), "src", "pages", "projects");

interface BlogFrontmatter {
  slug: string;
  title: string;
  releaseDate: Date;
  excerpt: string;
  type: "blog";
}

interface ProjectFrontmatter {
  type: "project";
  name: string;
  slug: string;
  blogTitle: string;
  releaseDate: Date;
  description: string;
  links: {
    href: string;
    title: string;
  }[];
}

export const getAllPostSlugsUnsorted = () => {
  const filenames = readdirSync(postsDirectory)
    .map(s => ({
      type: "blog",
      slug: s
    })).concat(readdirSync(projectsDirectory)
      .map(s => ({
        type: "project",
        slug: s
      })));

  const slugs = filenames
    .filter((file) => file.slug.endsWith(".mdx"))
    .map(post => ({ ...post, slug: post.slug.replace(".mdx", "") }));
  return slugs as { type: "blog" | "project", slug: string }[];
}

export const getAllPostsUnsorted = () => {
  const slugs = getAllPostSlugsUnsorted();
  const posts = slugs.map(async post => await getPostBySlug(post));
  return Promise.all(posts);
};

const getBlogFrontmatter = (frontmatter: Record<string, string>) => ({
  type: "blog",
  slug: frontmatter["slug"],
  title: frontmatter["title"],
  releaseDate: new Date(frontmatter["releaseDate"] || 0),
  excerpt: frontmatter["excerpt"],
} as BlogFrontmatter)

const getProjectFrontmatter = (frontmatter: Record<string, string>) => ({
  blogTitle: frontmatter["blogTitle"],
  name: frontmatter["name"],
  description: frontmatter["description"],
  links: frontmatter["links"] as unknown as { href: string; title: string; }[],
  releaseDate: new Date(frontmatter["releaseDate"] || 0),
  slug: frontmatter["slug"],
  type: "project"
} as ProjectFrontmatter)

export const getPostBySlug = async (post: { type: "blog" | "project", slug: string }) => {
  const dir = post.type === "blog" ? postsDirectory : projectsDirectory;
  const fullPath = join(dir, `${post.slug}.mdx`);
  if (!existsSync(fullPath)) {
    throw new Error(`Could not locate blog post: ${post.slug}`);
  }

  const filecontent = readFileSync(fullPath, "utf8");
  const mdxSource = await serialize(filecontent, { parseFrontmatter: true });

  if (!mdxSource.frontmatter) {
    throw new Error(`Could not load frontmatter for blog post: ${post.slug}`);
  }

  return {
    mdxSource,
    frontmatter: post.type === "blog" ? getBlogFrontmatter(mdxSource.frontmatter) : getProjectFrontmatter(mdxSource.frontmatter)
  };
};
