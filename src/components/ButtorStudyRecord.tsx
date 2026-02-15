import type { ICycle } from "../interfaces/ICycle"
import type { ITopicCycle } from "../interfaces/ITopicCycle"
import type { ITopicReview } from "../interfaces/ITopicReview"
import { PageButton } from "./PageButton"

type ButtonStudyRecordProps = {
    handleRegistrarEstudo: Function
    cycle: ICycle
    topic: ITopicCycle | ITopicReview
}

export function ButtonStudyRecord(props: ButtonStudyRecordProps) {
    return (
        <div title="Registrar Estudo" style={{ border: '1px solid #FFFFFF50', borderRadius: 4, maxWidth: "fit-content", padding: '0px 10px' }}>
            <PageButton type="text"
                style={{ color: '#FFF' }}
                onClick={() => {
                    props.handleRegistrarEstudo({
                        cycleId:props.cycle.id,
                        topicId:props.topic.id,
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