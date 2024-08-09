export class QuestionEntity {
  _id: string = ''
  type: number = 0
  question: string = ''
  chapter: number = 0
  figure: number = 0
  level: number = 0
  note: string = ''
  point: number = 0
  images: string[] = []
  config: {
    answers: string[]
    options: string[]
  } = {
    answers: [],
    options: [],
  }
  createdAt: Date = new Date()
  updatedAt: Date = new Date()
  guideImg: string[] = []
  solveImg: string[] = []
}
