export function sentenceCase(input: string) {
  const result = input.replace(/-/g, " ");
  const output = result.charAt(0).toUpperCase() + result.slice(1);
  return output;
}
