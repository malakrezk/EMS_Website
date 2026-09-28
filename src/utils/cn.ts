// Lightweight utility to merge conditional class names without extra dependencies
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
