import { Card } from 'antd'
import { Grid } from '../components/Grid'
import { Row } from '../components/Row'


interface IHitoryCycle {
    "description": string,
    "information": string,
    "annotation": string | null
}

interface ITopicMap {
    "id": number,
    "order": number,
    "rgb": string,
    "description": string,
    "elapsedTime": string,
    "score": string,
}

interface IMap {
    "description": string,
    "statusInfo": string,
    "annotation": string | null,
    "topics": ITopicMap[]
}

type CardMapProps = {
    studyMap: IMap
}

export function CardMap(props: CardMapProps) {
    return <Card style={{ width: '100%', background: '#FFF', marginBottom: 10 }}
    >
        <Row>
            <Grid cols="8 8 8 8">
                <h6>{props.studyMap.description}</h6>
            </Grid>
            <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                {props.studyMap.statusInfo}
            </Grid>
            <Grid cols="12 12 12 12" className='small'>
                {props.studyMap.annotation}
            </Grid>
            <Grid cols="12 12 12 12" >
                {props.studyMap.topics.map(item =>
                    <Card style={{ background: item.rgb, color: '#FFF' }}
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
                            <Grid cols="12 12 12 12" style={{ textAlign: 'right' }}>
                                {item.score}
                            </Grid>
                        </Row>
                    </Card>
                )}
            </Grid>
        </Row>
    </Card>
}