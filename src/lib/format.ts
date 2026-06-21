export function formatDkk(amount: number): string {
  return `${amount.toLocaleString("da-DK")} kr.`;
}
