import { Form, Input, Button, Radio, Space, Checkbox } from 'antd'
import type { ITopicForm } from '../interfaces/ITopicDiscipline'
import { Row } from './Row'
import { Grid } from './Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faAward } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

type TopicFormProps = {
    selectedTopic: ITopicForm | null
    onSubmit: (topic: ITopicForm) => void
    onCancel: () => void
}
const INCIDENCE_COLORS = [
    '#9E9E9E',
    '#71AD47',
    '#FEC000',
    '#EE7D31',
    '#BF0001',
]

const DEFAULT_TOPIC: ITopicForm = {
    rgb: INCIDENCE_COLORS[0],
    description: '',
    incidenceScore: 0,
    knowledgeScore: 0,
    reviewIntervals: [],
    annotation: '',
}

export const INCIDENCE_LABELS = [
    'Não sei',
    'Baixa',
    'Média',
    'Alta',
    'Altíssima',
]

export const KNOWLEDGE_LABELS = [
    { label: 'Ainda vou aprender', icon: <FontAwesomeIcon icon={faBook} style={{ marginRight: 6, color: '#753116' }} /> },
    { label: 'Conhecimento básico', icon: <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: 6, color: '#2b2b2b' }} /> },
    { label: 'Domino bem', icon: <FontAwesomeIcon icon={faAward} style={{ marginRight: 6, color: '#fad413' }} /> },
]



const REVIEW_INTERVALS = [1, 2, 3, 5, 7, 10, 15, 30, 45, 90]


export function TopicForm({ selectedTopic, onSubmit, onCancel }: TopicFormProps) {
    const [form] = Form.useForm()
    const incidenceScore = Form.useWatch('incidenceScore', form)

    useEffect(() => {
        if (selectedTopic) {
            form.setFieldsValue(selectedTopic)
        } else {
            form.setFieldsValue(DEFAULT_TOPIC)
        }
    }, [selectedTopic, form])


    useEffect(() => {
        if (typeof incidenceScore === 'number') {
            form.setFieldValue('rgb', INCIDENCE_COLORS[incidenceScore])
        }
    }, [incidenceScore])

    const handleSubmit = (values: any) => {
        console.log('OBJETO TÓPICO RESULTANTE:', values)
        onSubmit(values)
        form.resetFields()
        onCancel()
    }

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={DEFAULT_TOPIC}
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Descrição do tópico"
                name="description"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            {/* INCIDÊNCIA */}
            <Form.Item name="rgb" hidden>
                <Input />
            </Form.Item>

            <Form.Item label="Incidência" name="incidenceScore">
                <Radio.Group

                >
                    <Space wrap>
                        {INCIDENCE_LABELS.map((label, index) => (
                            <Radio
                                key={index}
                                value={index}
                                style={{
                                    background: INCIDENCE_COLORS[index],
                                    color: '#FFF',
                                    padding: '6px 12px',
                                    borderRadius: 6,
                                    border: 'none',
                                }}
                            >
                                {label}
                            </Radio>
                        ))}
                    </Space>
                </Radio.Group>
            </Form.Item>

            {/* CONHECIMENTO */}
            <Form.Item label="Conhecimento" name="knowledgeScore">
                <Radio.Group>
                    <Space wrap>
                        {KNOWLEDGE_LABELS.map(({ label, icon }, index) => {

                            return (
                                <Radio
                                    key={index}
                                    value={index}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: 6,
                                        border: 'none',
                                    }}
                                >
                                    {label}{icon}
                                </Radio>
                            )
                        })}
                    </Space>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Intervalos de revisão"
                name="reviewIntervals"
                rules={[{ required: true, message: 'Selecione ao menos um intervalo' }]}
            >
                <Checkbox.Group>
                    {REVIEW_INTERVALS.map(day => (
                        <Checkbox key={day} value={day}>
                            {day}d
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Form.Item>

            <Form.Item label="Anotação" name="annotation">
                <Input.TextArea rows={3} />
            </Form.Item>
            <Row>
                <Grid cols="6 6 6 6">
                    <Button type="primary" htmlType="submit" block>
                        {selectedTopic ? 'Salvar alterações' : 'Adicionar tópico'}
                    </Button>

                </Grid>
                <Grid cols="6 6 6 6">
                    <Button type="primary" danger htmlType="button" block onClick={onCancel}>
                        Cancelar
                    </Button>
                </Grid>
            </Row>
        </Form>
    )
}
