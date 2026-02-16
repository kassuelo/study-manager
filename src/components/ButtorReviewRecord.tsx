import type { ITopicCycle } from "../interfaces/ITopicCycle"
import type { ITopicReview } from "../interfaces/ITopicReview"
import { PageButton } from "./PageButton"

type ButtonReviewRecordProps = {
    handleRegistrarRevisao: Function
    topic: ITopicCycle | ITopicReview
}

export function ButtonReviewRecord(props: ButtonReviewRecordProps) {
    return (
        <div title="Registrar Estudo" style={{ border: '1px solid #FFFFFF50', borderRadius: 4, maxWidth: "fit-content", padding: '0px 10px' }}>
            <PageButton type="text"
                style={{ color: '#FFF' }}
                onClick={() => {
                    props.handleRegistrarRevisao({
                        topicId: props.topic.id,
                        disciplineDescription: props.topic.subject,
                        topicDescription: props.topic.description
                    })
                }}
                icon="clipboard-check"
                element={<h6 className='pt-2'> {props.topic.description}</h6>}
            />
        </div>
    )
}