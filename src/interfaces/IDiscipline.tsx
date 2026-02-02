import type { ITopicForm } from "./ITopicDiscipline";

export interface IDiscipline {
    id?: number,
    order?: number,
    description: string,
    statusInfo: string,
    annotation: string | null,
    topics: ITopicForm[]
}