export const compareTwoArray = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) return false
  for (let i = 1; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

export function slitIdToNumbers(id: string): number[] {
  const numbers = id.match(/\d+/g)?.map(Number) ?? []
  return numbers
}
