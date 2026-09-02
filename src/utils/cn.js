// Lightweight utility to merge conditional class names without extra dependencies
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
