export type CommandGroupId = "quick" | "projects" | "sections" | "atmosphere";

export interface CommandSearchItem {
  id: string;
  group: CommandGroupId;
  label: string;
  subtitle?: string;
  keywords: string[];
}

export type PaletteKeyAction =
  | { type: "move"; nextIndex: number }
  | { type: "select"; index: number }
  | { type: "close" }
  | { type: "none" };

export function filterCommandItems<T extends CommandSearchItem>(
  items: readonly T[],
  query: string,
): T[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return [...items];
  }

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    const haystack = [
      item.label,
      item.subtitle ?? "",
      item.group,
      ...item.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return tokens.every((token) => haystack.includes(token));
  });
}

export function resolveCommandPaletteKeyAction(
  key: string,
  activeIndex: number,
  totalCount: number,
): PaletteKeyAction {
  if (key === "Escape") {
    return { type: "close" };
  }

  if (totalCount <= 0) {
    return { type: "none" };
  }

  switch (key) {
    case "ArrowDown":
      return {
        type: "move",
        nextIndex:
          activeIndex >= 0 && activeIndex < totalCount
            ? (activeIndex + 1) % totalCount
            : 0,
      };
    case "ArrowUp":
      return {
        type: "move",
        nextIndex:
          activeIndex >= 0 && activeIndex < totalCount
            ? (activeIndex - 1 + totalCount) % totalCount
            : totalCount - 1,
      };
    case "Home":
      return {
        type: "move",
        nextIndex: 0,
      };
    case "End":
      return {
        type: "move",
        nextIndex: totalCount - 1,
      };
    case "Enter":
      return {
        type: "select",
        index: Math.max(
          0,
          Math.min(totalCount - 1, activeIndex < 0 ? 0 : activeIndex),
        ),
      };
    default:
      return { type: "none" };
  }
}
