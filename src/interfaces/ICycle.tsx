import type { ITopicCycle } from "./ITopicCycle"

export interface ICycle {
    id?: number,
    order?: number,
    description: string,
    statusInfo: string,
    annotation: string | null
    topics: ITopicCycle[]
}