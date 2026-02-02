
import { Card } from 'antd'
import { Grid } from './Grid'
import { PageButton } from './PageButton'
import { Row } from './Row'
import { useState } from 'react'
import type { ITopicCycle } from '../interfaces/ITopicCycle'


type CardTopicProps = {
    topic: ITopicCycle
}

export function CardTopicCycle(props: CardTopicProps) {
    const [expand, setExpand] = useState(false)
    return <Card style={{ background: props.topic.rgb, color: '#FFF' }}
        styles={{
            body: {
                padding: 10,
            },
        }}
    >
        <Row>
            <Grid cols="8 8 8 8">
                <h6>{props.topic.description}</h6>
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