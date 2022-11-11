export const displayDate = (date: number) => new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
