<script lang="ts">
  import ColoredSquare from "./ColoredSquare.svelte";

  export let slug: string;
  export let releaseDate: number;
  export let type: "project" | "blog";
  export let title: string;
  export let excerpt: string;

  export let isBlogPost: boolean;
</script>

<div>
  <ColoredSquare theme="dark" seed={slug} />
  <a href={slug}>{title}</a>
</div>
