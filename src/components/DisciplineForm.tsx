import { Form, Input, Button, Card } from 'antd'
import { useEffect, useState, type MouseEventHandler } from 'react'
import { INCIDENCE_LABELS, KNOWLEDGE_LABELS, TopicForm } from './TopicForm'
import type { ITopicDiscipline } from '../interfaces/ITopicDiscipline'
import { Row } from './Row'
import { Grid } from './Grid'
import { PageButton } from './PageButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IDiscipline } from '../interfaces/IDiscipline'

const DEFAULT_FORM = {
    description: '',
    annotation: '',
    topics: [] as ITopicDiscipline[],
}

type DisciplineFormProps = {
    selectedDiscipline: IDiscipline | null
    onSubmit: Function
    onCancel: MouseEventHandler<HTMLButtonElement>
}

const DEFAULT_TOPIC = {
    description: '',
    incidenceScore: 0,
    knowledgeScore: 0,
    reviewIntervals: [1],
    annotation: '',
}


export function DisciplineForm(props: DisciplineFormProps) {
    const [showTopicForm, setShowTopicForm] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState<ITopicDiscipline | null>(null)
    const [form] = Form.useForm()
    const [topics, setTopics] = useState<ITopicDiscipline[]>([])

    useEffect(() => {
        // Modo cadastro (sem disciplina selecionada)
        if (!props.selectedDiscipline) {
            form.resetFields();        // limpa formulário
            setTopics([]);             // limpa tópicos
            setSelectedTopic(null);    // limpa tópico selecionado
            return;
        }

        // Modo edição
        form.setFieldsValue({
            description: props.selectedDiscipline.description,
            annotation: props.selectedDiscipline.annotation,
        });

        setTopics(
            props.selectedDiscipline.topics.map(topic => ({
                description: topic.description ?? DEFAULT_TOPIC.description,
                incidenceScore: topic.incidenceScore ?? DEFAULT_TOPIC.incidenceScore,
                knowledgeScore: topic.knowledgeScore ?? DEFAULT_TOPIC.knowledgeScore,
                reviewIntervals: topic.reviewIntervals ?? DEFAULT_TOPIC.reviewIntervals,
                annotation: topic.annotation ?? DEFAULT_TOPIC.annotation,
            }))
        );

    }, [props.selectedDiscipline, form]);



    const handleAddTopic = (topic: ITopicDiscipline) => {
        setTopics(prev => [...prev, topic])
    }

    const handleRemoveTopic = (topic: ITopicDiscipline) => {
        setTopics(prev => [...prev.filter(t => JSON.stringify(topic) !== JSON.stringify(t))])
    }

    type EditTopicProps = {
        oldTopic: ITopicDiscipline
        newTopic: ITopicDiscipline
    }

    const handleEditTopic = ({ oldTopic, newTopic }: EditTopicProps) => {
        handleRemoveTopic(oldTopic)
        handleAddTopic(newTopic)
    }

    const handleSubmit = (values: any) => {
        const payload = {
            id: props.selectedDiscipline?.id,
            ...values,
            topics,
        }

        props.onSubmit(payload)
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

                        <Form.Item label="Anotação" name="annotation">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Grid cols="12 12 12 12" style={{ textAlign: 'right', paddingBottom: 10 }}>
                            <PageButton onClick={() => setShowTopicForm(true)} icon="plus" text="Incluir Tópico" />
                        </Grid>
                        {/* Lista de tópicos adicionados */}
                        {topics.map((topic, index) => (
                            <Card key={index} size="small" style={{ marginBottom: 8 }}>
                                <Row>
                                    <Grid cols="8 8 8 8" >
                                        <strong>{topic.description}</strong>
                                        <div>Incidência: {topic.incidenceScore && topic.incidenceScore >= 0 ? INCIDENCE_LABELS[topic.incidenceScore] : '-'}</div>
                                        <div>Conhecimento: {topic.knowledgeScore && topic.knowledgeScore >= 0 ? KNOWLEDGE_LABELS[topic.knowledgeScore].label : '-'}
                                            {topic.knowledgeScore && topic.knowledgeScore >= 0 ? KNOWLEDGE_LABELS[topic.knowledgeScore].icon : null}
                                        </div>
                                        <div>Revisões: {(topic.reviewIntervals || []).map(r => r + "d").join(', ')}</div>
                                    </Grid>
                                    <Grid cols="4 4 4 4" style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, paddingBottom: 14 }}>
                                        <PageButton type="primary"
                                            style={{ background: '#ffb950' }}
                                            onClick={() => {
                                                setSelectedTopic(topic)
                                                setShowTopicForm(true)
                                            }} icon="edit" text="" />
                                        <PageButton type="primary" danger
                                            onClick={() => {
                                                if (!window.confirm('Deseja realmente excluir o tópico da disciplina?')) return;
                                                handleRemoveTopic(topic)
                                            }} icon="trash" text="" />
                                    </Grid>
                                </Row>
                            </Card>
                        ))}

                        <Row>
                            <Grid cols="6 6 6 6" >
                                <Button color="green" variant="solid" type="primary" icon={<FontAwesomeIcon icon={'check'} />} htmlType="submit" block>
                                    Salvar Disciplina
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
