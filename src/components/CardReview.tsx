import { Card } from 'antd'
import { Grid } from '../components/Grid'
import { Row } from '../components/Row'
import type { IReview } from '../interfaces/IReview'
import { CardTopicReview } from './CardTopicReview'

type CardReviewProps = {
    handleRegistrarEstudo: Function
    review: IReview
}

export function CardReview(props: CardReviewProps) {
    return <Card style={{ width: '100%', background: '#FFF', marginBottom: 10 }}>
        <Row>
            <Grid cols="8 8 8 8">
                <h6>{props.review.description}</h6>
            </Grid>
            <Grid cols="12 12 12 12" style={{ textAlign: 'right' }}>
                {props.review.statusInfo}
            </Grid>
            <Grid cols="12 12 12 12" >
                {props.review.topics.map((topic, i) => <CardTopicReview key={i} topic={topic}  handleRegistrarEstudo={props.handleRegistrarEstudo}/>)}
            </Grid>
        </Row>
    </Card>

}