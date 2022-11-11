<script lang="ts">
  import { displayDate } from "../lib/dateUtils";
  import ColoredSquare from "./ColoredSquare.svelte";

  export let slug: string;
  export let releaseDate: number;
  export let type: "project" | "blog";
  export let title: string;
  export let excerpt: string;

  export let isBlogPost: boolean;
</script>

<div class="container">
  <ColoredSquare theme="dark" seed={slug} />
  <div>
    <h3>
      <a href={`/${isBlogPost ? "blog" : "projects"}/${slug}`}>{title}</a>
    </h3>
    <div class="metadata-container">
      <p>{displayDate(releaseDate)}</p>
      <p>{excerpt}</p>
    </div>
  </div>
</div>

<style>
  h3 {
    margin: 0;
  }
  .container {
    display: flex;
    padding: 12px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: top;
    gap: 12px;
  }
  .metadata-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
  }
  .metadata-container p {
    margin: 0;
  }
</style>
