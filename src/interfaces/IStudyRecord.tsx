export interface IStudyRecord {
    /** Data real do estudo (pode ser diferente da data atual) */
    startedAt: string; // formato: YYYY-MM-DD

    /** Tempo efetivo de estudo em minutos */
    minutes: number;

    /** Quantidade de questões resolvidas (opcional) */
    questionsSolved?: number;

    /** Quantidade de questões erradas (opcional) */
    questionsIncorrected?: number;

    /** Anotação do estudo (máx. 250 caracteres) */
    annotation?: string;

    /** Indica se o tópico foi finalizado */
    isDone: boolean;

    //usados para enviar a request
    cycleId: number
    topicId: number
    //usados para exibir no form a descricao apenas
    disciplineDescription: string
    topicDescription: string
}
