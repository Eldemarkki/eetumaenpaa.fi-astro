// Source: https://stackoverflow.com/a/44134328/8715999
const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const generateGradient = (
  colorScheme: "light" | "dark",
  seed: string,
) => {
  // Just do some random calculations to get a hue based on the seed
  const random =
    seed.length *
    Array.from(seed)
      .map((c, i) => (c.charCodeAt(0) || 1) * (i + 1))
      .reduce((prev, curr) => prev + curr, 0) *
    67607;

  const hue = Math.floor(random % 360);

  if (colorScheme === "dark") {
    return [hslToHex(hue, 57, 47), hslToHex(hue, 38, 89)];
  } else {
    return [hslToHex(hue, 57, 67), hslToHex(hue, 38, 99)];
  }
};
