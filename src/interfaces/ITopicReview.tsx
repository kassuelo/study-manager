interface IHistoryReview {
  id?: number
  description: string
  information: string
  annotation: string | null
}

export interface ITopicReview {
  id?: number
  order: number
  rgb: string
  description: string
  elapsedTime: string
  score: string
  subject: string
  annotation: string | null
  reviewInfo: string
  history: IHistoryReview[]
}
