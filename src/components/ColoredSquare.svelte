<script lang="ts">
  import { generateGradient } from "../lib/colorUtils";

  export let seed: string;
  export let theme: "dark" | "light";
</script>

<div
  style={`background: linear-gradient(30deg, ${generateGradient(
    theme,
    seed
  ).join(", ")});`}
/>

<style>
  div {
    margin-top: 12px;
    aspect-ratio: 1;
    height: 50px;
    border-radius: 16px 0px 16px 16px;
  }
</style>
