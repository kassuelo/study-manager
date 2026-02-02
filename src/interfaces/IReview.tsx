import type { ITopicReview } from "./ITopicReview";

export interface IReview {
    id?: number,
    order?: number,
    description: string,
    statusInfo: string,
    topics: ITopicReview[]
}