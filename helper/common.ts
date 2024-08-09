export const sortStudyNodeIds = (nodes: string[], clone = false): string[] => {
  const impact = clone ? nodes.slice() : nodes
  return impact.sort((a, b) => {
    const [c1, d1, m1] = a.split('-').reverse()
    const [c2, d2, m2] = b.split('-').reverse()

    if (c1 !== c2) {
      return c1.localeCompare(c2)
    } else if (d1 !== d2) {
      return d1.localeCompare(d2)
    } else {
      return m1.localeCompare(m2)
    }
  })
}
