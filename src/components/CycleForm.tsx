import { Form, Input, Button, Card } from 'antd'
import { useEffect, useState, type MouseEventHandler } from 'react'
import { INCIDENCE_LABELS, KNOWLEDGE_LABELS, TopicForm } from './TopicForm'
import { Row } from './Row'
import { Grid } from './Grid'
import { PageButton } from './PageButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ITopicCycle } from '../interfaces/ITopicCycle'
import type { ICycle } from '../interfaces/ICycle'

const DEFAULT_FORM = {
    description: '',
    statusInfo: '',
    topics: [] as ITopicCycle[],
}

type DisciplineFormProps = {
    selectedCycle: ICycle | null
    onSubmit: Function
    onCancel: MouseEventHandler<HTMLButtonElement>
}

export function CycleForm(props: DisciplineFormProps) {
    const [showTopicForm, setShowTopicForm] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState<ITopicCycle | null>(null)
    const [form] = Form.useForm()
    const [topics, setTopics] = useState<ITopicCycle[]>([])

    useEffect(() => {
        console.log(props.selectedCycle)
        if (!props.selectedCycle) return

        // Preenche os campos do formulário
        form.setFieldsValue({
            description: props.selectedCycle.description,
            statusInfo: props.selectedCycle.statusInfo,
        })

        // Preenche os tópicos
        setTopics(props.selectedCycle.topics || [])

    }, [props.selectedCycle, form])


    const handleAddTopic = (topic: ITopicCycle) => {
        setTopics(prev => [...prev, topic])
    }

    const handleRemoveTopic = (topic: ITopicCycle) => {
        setTopics(prev => [...prev.filter(t => JSON.stringify(topic) !== JSON.stringify(t))])
    }

    type EditTopicProps = {
        oldTopic: ITopicCycle
        newTopic: ITopicCycle
    }

    const handleEditTopic = ({ oldTopic, newTopic }: EditTopicProps) => {
        handleRemoveTopic(oldTopic)
        handleAddTopic(newTopic)
    }

    const handleSubmit = (values: any) => {
        const payload = {
            ...values,
            topics,
        }

        console.log('OBJETO CICLO RESULTANTE:', payload)
        props.onSubmit(payload)
        setSelectedTopic(null)
    }

    return (
        <>
            {showTopicForm ?
                <Card title="Adicionar tópico" style={{ marginBottom: 16 }}>
                    <TopicForm
                        selectedTopic={selectedTopic}
                        onSubmit={(newTopic) => selectedTopic ? handleEditTopic({ oldTopic: selectedTopic, newTopic }) : handleAddTopic(newTopic)}
                        onCancel={() => {
                            setShowTopicForm(false);
                            setSelectedTopic(null);
                        }} />
                </Card>
                :
                <Row>

                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={DEFAULT_FORM}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Descrição da disciplina"
                            name="description"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Situação" name="statusInfo">
                            <Input />
                        </Form.Item>
                        <Grid cols="12 12 12 12" style={{ textAlign: 'right', paddingBottom: 10 }}>
                            <PageButton onClick={() => setShowTopicForm(true)} icon="plus" text="Incluir Tópico" />
                        </Grid>
                        {/* Lista de tópicos adicionados */}
                        {topics.map((topic, index) => (
                            <Card key={index} size="small" style={{ marginBottom: 8 }}>
                                <Row>
                                    <Grid cols="10 10 10 10" >
                                        <strong>{topic.description}</strong>
                                        <div>{topic.elapsedTime}</div>
                                        <div>{topic.score}</div>

                                    </Grid>
                                    <Grid cols="2 2 2 2" style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, paddingBottom: 14 }}>
                                        <PageButton type="primary"
                                            style={{ background: '#ffb950' }}
                                            onClick={() => {
                                                console.log(topic)
                                                setSelectedTopic(topic)
                                                setShowTopicForm(true)
                                            }} icon="edit" text="" />
                                        <PageButton type="primary" danger
                                            onClick={() => {
                                                if (!window.confirm('Deseja realmente excluir o tópico da disciplina?')) return;
                                                handleRemoveTopic(topic)
                                            }} icon="trash" text="" />
                                    </Grid>
                                    <Grid cols="12 12 12 12" >
                                        <div className='p-3' style={{ background: '#ededed', marginBlock: 10, borderRadius: 10 }} >
                                            <div className='pe-1'>Assunto:</div>{topic.subject || '-'}
                                            <div className='pe-1'>Anotações:</div>{topic.annotation || ' - '}
                                            {/* <div className='pe-1'>Info:</div>{topic.reviewInfo || '-'} */}
                                        </div>
                                    </Grid>
                                </Row>
                            </Card>
                        ))}

                        <Row>
                            <Grid cols="6 6 6 6" >
                                <Button color="green" variant="solid" type="primary" icon={<FontAwesomeIcon icon={'check'} />} htmlType="submit" block>
                                    Salvar Revisão
                                </Button>
                            </Grid>
                            <Grid cols="6 6 6 6" >
                                <PageButton type="primary" danger onClick={props.onCancel} icon="times" text="Cancelar" block />
                            </Grid>
                        </Row>


                    </Form>
                </Row>
            }
        </>
    )
}
