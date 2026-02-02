import { Card } from 'antd'
import { Grid } from '../components/Grid'
import { PageButton } from '../components/PageButton'
import { Row } from '../components/Row'
import type { ICycle } from '../interfaces/ICycle'
import { CardTopicCycle } from './CardTopicCycle'

type CardCycleProps = {
    cycle: ICycle
    handleEditarCiclo: Function
    handleExcluirCiclo: Function
}

export function CardCycle(props: CardCycleProps) {
    return <Card style={{ width: '100%', background: '#FFF', marginBottom: 10 }}>
        <Row>
            <Grid cols="8 8 8 8">
                <h5>{props.cycle.description}</h5>
            </Grid>
            <Grid cols="4 4 4 4" style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, paddingBottom: 14 }}>
                <PageButton type="primary"
                    style={{ background: '#ffb950' }}
                    onClick={() => {
                        props.handleEditarCiclo(props.cycle)
                    }} icon="edit" text="" />
                <PageButton type="primary" danger
                    onClick={() => {
                        props.handleExcluirCiclo(props.cycle)
                    }} icon="trash" text="" />
            </Grid>
            <Grid cols="12 12 12 12" style={{ textAlign: 'right' }}>
                {props.cycle.statusInfo}
            </Grid>
            <Grid cols="12 12 12 12" >
                {props.cycle.topics.map((topic, i) => <CardTopicCycle key={i} topic={topic} />

                )}
            </Grid>
        </Row>
    </Card>

}