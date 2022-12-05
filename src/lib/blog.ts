interface BlogFrontmatter {
  slug: string;
  title: string;
  releaseDate: string;
  excerpt: string;
  type: "blog";
}

interface ProjectFrontmatter {
  type: "project";
  name: string;
  slug: string;
  blogTitle: string;
  releaseDate: string;
  description: string;
  links: {
    href: string;
    title: string;
  }[];
}

const getTypeFromUrl = (url: string) => {
  if (url.startsWith("/blog/")) return "blog";
  if (url.startsWith("/projects/")) return "project";
  return null;
}

export const getAllPostsUnsorted = async () => {
  const promiseGlobs = import.meta.glob("./../**/*.mdx");

  return Promise.all(Object.keys(promiseGlobs).map(async (key) => {
    if (key in promiseGlobs) {
      const parseFunction = promiseGlobs[key];
      if (parseFunction) {
        const post = await parseFunction()
        if (typeof post === "object" && post !== null && "frontmatter" in post && typeof post.frontmatter === "object" && post.frontmatter !== null) {
          if ("url" in post && typeof post.url === "string") {
            return {
              ...post.frontmatter,
              type: getTypeFromUrl(post.url),
            } as BlogFrontmatter | ProjectFrontmatter;
          }
          else {
            throw new Error("url not found in post");
          }
        }
        else {
          throw new Error("Module is not an object or doesn't contain frontmatter");
        }
      } else {
        throw new Error("Module is not a function");
      }
    }
    else {
      throw new Error("Key not in promiseGlobs. This should never happen");
    }
  }));
};
