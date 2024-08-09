export interface StudyNodeEntity {
  time: number
  children: string[]
  parent: string[]
}

export interface ClusterStudyNode {
  members: string[]
  point: number
}

export interface StudyPathState {
  seeds: Set<string>
  nodes: Set<string>
  time: number
}
