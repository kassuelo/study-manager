
import { Card } from 'antd'
import { Grid } from './Grid'
import { PageButton } from './PageButton'
import { Row } from './Row'
import { useState } from 'react'
import type { ITopicReview } from '../interfaces/ITopicReview'
import { ButtonStudyRecord } from './ButtorStudyRecord'


type CardTopicProps = {
    handleRegistrarEstudo: Function
    topic: ITopicReview
}

export function CardTopicReview(props: CardTopicProps) {
    const [expand, setExpand] = useState(true)
    return <Card style={{ background: props.topic.rgb, color: '#FFF' }}
        styles={{
            body: {
                padding: 10,
            },
        }}
    >
        <Row>
            <Grid cols="8 8 8 8">
                <ButtonStudyRecord handleRegistrarEstudo={props.handleRegistrarEstudo} topic={props.topic} />
            </Grid>
            <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                {props.topic.elapsedTime}
            </Grid>
            {expand ?
                <>
                    <Grid cols="12 12 12 12" style={{ textAlign: 'right' }}>
                        {props.topic.score}
                    </Grid>
                    <Grid cols="12 12 12 12">
                        <Card style={{ background: '#fbfbfb', marginInline: 10, marginBlock: 5 }}
                            styles={{
                                body: {
                                    padding: 5,
                                },
                            }}
                        >
                            <Grid cols="12 12 12 12">
                                <span className='pe-1'>Assunto:</span>{props.topic.subject || '-'}
                            </Grid>
                            <Grid cols="12 12 12 12">
                                <span className='pe-1'>Anotações:</span>{props.topic.annotation || ' - '}
                            </Grid>
                            <Grid cols="12 12 12 12">
                                <span className='pe-1'>Info:</span>{props.topic.reviewInfo || '-'}
                            </Grid>
                            <Card style={{ background: '#d8e2e5', marginInline: 2, marginBlock: 5 }}
                                styles={{
                                    body: {
                                        padding: 5,
                                    },
                                }}
                            >
                                <h6 className='medium pt-1'>Histórico</h6>
                                {props.topic.history.map((h, j) =>
                                    <div key={j}>
                                        <Grid cols="12 12 12 12">
                                            <hr />
                                            <span className='pe-1'>Descrição:</span>{h.description || '-'}
                                        </Grid>
                                        <Grid cols="12 12 12 12">
                                            <span className='pe-1'>Informação:</span>{h.information || '-'}
                                        </Grid>
                                        <Grid cols="12 12 12 12">
                                            <span className='pe-1'>Anotações:</span>{h.annotation || '-'}

                                        </Grid>
                                    </div>
                                )}
                            </Card>
                        </Card>
                    </Grid>
                    <Grid cols="12 12 12 12">
                        <PageButton
                            style={{ background: '#00000050' }}
                            className="text-light"
                            type='text'
                            icon="chevron-up"
                            text="Recolher"
                            onClick={() => setExpand(false)}
                        />
                    </Grid>
                </>
                : <>
                    <Grid cols="6 6 6 6">
                        <PageButton
                            style={{ background: '#00000050' }}
                            className="text-light"
                            type='text'
                            icon="chevron-down"
                            text="Expandir"
                            onClick={() => setExpand(true)}
                        />
                    </Grid>
                    <Grid cols="6 6 6 6" style={{ textAlign: 'right' }}>
                        {props.topic.score}
                    </Grid>
                </>}

        </Row>
    </Card>
}