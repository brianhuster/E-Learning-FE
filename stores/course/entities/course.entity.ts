export interface FigureDocument {
  type: 'pdf' | 'video'
  url: string
}

export interface CourseFigureChapter {
  figureName: string
  figureNumber: number
  documents: FigureDocument[]
}

export interface CourseChapterEntity {
  chapterName: string
  chapterNumber: number
  figures: CourseFigureChapter[]
}

export interface CourseEntity {
  _id: string
  courseName: string
  chapters: CourseChapterEntity[]
}
