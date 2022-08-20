<script lang="ts">
  export let links: {
    title: string;
    href: string;
  }[];
</script>

<div>
  {#each links as link}
    <a href={link.href}>{link.title}</a>
  {/each}
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
  }
</style>
