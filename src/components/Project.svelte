<script lang="ts">
  import LinkCollection from "./LinkCollection.svelte";

  export let title: string;
  export let description: string;
  export let links: {
    title: string;
    href: string;
  }[];
  export let image:
    | {
        src: string;
        alt: string;
      }
    | undefined;
</script>

<section>
  <h3>{title}</h3>
  <LinkCollection {links} />
  <p>{description}</p>
  {#if image}
    <img src={image.src} alt={image.alt} />
  {/if}
  <slot />
</section>

<style>
  section {
    width: 100%;
  }

  img {
    width: 100%;
    height: auto;
  }
</style>
