const CAT_STRINGS = [
  'bpc',
  'eac',
  '6qi',
]

export const randomCatImage = (): string => {
  const index = Math.floor(Math.random() * CAT_STRINGS.length);
  return CAT_STRINGS[index];
}
