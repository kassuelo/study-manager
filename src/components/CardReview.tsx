import { Card } from 'antd'
import { Grid } from '../components/Grid'
import { PageButton } from '../components/PageButton'
import { Row } from '../components/Row'
import { useState } from 'react'
import type { IReview } from '../interfaces/IReview'

type CardReviewProps = {
    review: IReview
}

export function CardReview(props: CardReviewProps) {
    const [expand, setExpand] = useState(false)
    return <Card style={{ width: '100%', background: '#FFF', marginBottom: 10 }}>
        <Row>
            <Grid cols="8 8 8 8">
                <h6>{props.review.description}</h6>
            </Grid>
            <Grid cols="12 12 12 12" style={{ textAlign: 'right' }}>
                {props.review.statusInfo}
            </Grid>
            <Grid cols="12 12 12 12" >
                {props.review.topics.map((item, i) =>
                    <Card key={i} style={{ background: item.rgb, color: '#FFF' }}
                        styles={{
                            body: {
                                padding: 10,
                            },
                        }}
                    >
                        <Row>
                            <Grid cols="8 8 8 8">
                                <h6>{item.description}</h6>
                            </Grid>
                            <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                                {item.elapsedTime}
                            </Grid>
                            {expand ?
                                <>
                                    <Grid cols="12 12 12 12" style={{ textAlign: 'right' }}>
                                        {item.score}
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
                                                <span className='pe-1'>Assunto:</span>{item.subject || '-'}
                                            </Grid>
                                            <Grid cols="12 12 12 12">
                                                <span className='pe-1'>Anotações:</span>{item.annotation || ' - '}
                                            </Grid>
                                            <Grid cols="12 12 12 12">
                                                <span className='pe-1'>Info:</span>{item.reviewInfo || '-'}
                                            </Grid>
                                            <Card style={{ background: '#d8e2e5', marginInline: 2, marginBlock: 5 }}
                                                styles={{
                                                    body: {
                                                        padding: 5,
                                                    },
                                                }}
                                            >
                                                <h6 className='medium pt-1'>Histórico</h6>
                                                {item.history.map((h, j) =>
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
                                        {item.score}
                                    </Grid>
                                </>}

                        </Row>
                    </Card>
                )}
            </Grid>
        </Row>
    </Card>

}