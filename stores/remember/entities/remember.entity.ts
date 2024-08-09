export interface RememberContentInterface {
  text: string
  img: string
}

export interface RememberInterface {
  chapterNumber: number
  figureName: number
  title: string
  content: RememberContentInterface[]
}

export interface RememberEntityInterface {
  title: string
  text: string
  img: string
}
