import { Form, Input, Button, Modal, DatePicker, TimePicker, InputNumber, Checkbox } from 'antd'
import { useEffect, type MouseEventHandler } from 'react'
import { Row } from './Row'
import { Grid } from './Grid'
import { PageButton } from './PageButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import type { IReviewRecord } from '../interfaces/IReviewRecord'

const DEFAULT_FORM = {
    topicId: null,
    disciplineDescription: '',
    topicDescription: '',
    startedAt: dayjs(),
    minutes: null,
    questionsSolved: null,
    questionsIncorrected: null,
    isDone: false,
    annotation: '',
}

type selectedReviewRecordFormProps = {
    selectedReviewRecord: IReviewRecord
    visible: boolean
    onSubmit: Function
    onCancel: MouseEventHandler<HTMLButtonElement>
}

export function ReviewRecordForm(props: selectedReviewRecordFormProps) {
    if (!props.visible) return null;

    const [form] = Form.useForm()

    useEffect(() => {
        if (props.visible) {
            form.setFieldsValue({
                disciplineDescription: props.selectedReviewRecord?.disciplineDescription,
                topicDescription: props.selectedReviewRecord?.topicDescription,
            })
        }
    },[ props.visible, props.selectedReviewRecord?.disciplineDescription, props.selectedReviewRecord?.topicDescription, form])

    useEffect(() => {
        if (!props.visible) {
            form.resetFields()
        }
    }, [props.visible, form])

    function handleSubmit(values: any) {
        const payload: IReviewRecord = {
            ...values,
            startedAt: values.startedAt.format('YYYY-MM-DD'),
            minutes: Number(values.minutes),
            questionsSolved: Number(values.questionsSolved),
            questionsIncorrected: Number(values.questionsIncorrected),
            topicId: props.selectedReviewRecord?.topicId,
        }
        // console.log(payload)
        props.onSubmit(payload)
    }

    return (
        <Modal
            title={"Incluir Registro de Estudos"}
            open={props.visible}
            onCancel={props.onCancel}
            footer={null} // deixa os botões dentro do form
            destroyOnHidden
            width={'min(800px,80vw)'}
        >
            <Row>

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={DEFAULT_FORM}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Descrição da disciplina"
                        name="disciplineDescription"
                        rules={[{ required: true }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Descrição do tópico"
                        name="topicDescription"
                        rules={[{ required: true }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    {/* Data */}
                    <Form.Item
                        label="Data de Início"
                        name="startedAt"
                        rules={[{ required: true, message: 'Selecione a data' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>

                    {/* Duração */}
                    <Form.Item
                        label="Duração em minutos"
                        name="minutes"
                        normalize={(value) => value?.replace(/\D/g, '')}
                        rules={[
                            { required: true, message: 'Informe a duração' },
                        ]}
                    >
                        <Input
                            inputMode="numeric"
                            placeholder="Digite apenas números"
                        />
                    </Form.Item>

                    {/* <Form.Item
                        label="Duração (HH:MM)"
                        name="duration"
                        rules={[{ required: true, message: 'Informe a duração' }]}
                    >
                        <TimePicker format="HH:mm" style={{ width: '100%' }} placeholder="Selecione o horário" />
                    </Form.Item> */}

                    <Form.Item
                        label="Total de questões"
                        name="questionsSolved"
                        normalize={(value) => value?.replace(/\D/g, '')}
                        rules={[
                            { required: true, message: 'Informe a quantidade' },
                        ]}
                    >
                        <Input
                            inputMode="numeric"
                            placeholder="Digite apenas números"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Respostas incorretas"
                        name="questionsIncorrected"
                        normalize={(value) => value?.replace(/\D/g, '')}
                        rules={[
                            { required: true, message: 'Informe a quantidade' },
                        ]}
                    >
                        <Input
                            inputMode="numeric"
                            placeholder="Digite apenas números"
                        />
                    </Form.Item>

                    {/* Concluído */}
                    <Form.Item
                        name="isDone"
                        valuePropName="checked"
                    >
                        <Checkbox>Concluído</Checkbox>
                    </Form.Item>

                    {/* Anotações */}
                    <Form.Item
                        label="Anotações"
                        name="annotation"
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Observações sobre o estudo..."
                        />
                    </Form.Item>


                    <Row>
                        <Grid cols="6 6 6 6" >
                            <Button color="green" variant="solid" type="primary" icon={<FontAwesomeIcon icon={'check'} />} htmlType="submit" block>
                                Salvar Registro de Estudo
                            </Button>
                        </Grid>
                        <Grid cols="6 6 6 6" >
                            <PageButton type="primary" danger onClick={props.onCancel} icon="times" text="Cancelar" block />
                        </Grid>
                    </Row>


                </Form>
            </Row>
        </Modal>
    )
}
