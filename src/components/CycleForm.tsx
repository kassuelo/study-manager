import { Form, Input, Button, Card, Select, Modal } from 'antd'
import { useEffect, useState, type MouseEventHandler } from 'react'
import { KNOWLEDGE_LABELS, TopicForm } from './TopicForm'
import { Row } from './Row'
import { Grid } from './Grid'
import { PageButton } from './PageButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ICycle } from '../interfaces/ICycle'
import { useStudyMap } from '../hooks/useStudyMap'
import type { IDiscipline } from '../interfaces/IDiscipline'
import type { ITopicDiscipline } from '../interfaces/ITopicDiscipline'
import { toast } from 'react-toastify'

const DEFAULT_FORM = {
    description: '',
    statusInfo: '',
    topics: [] as ITopicDiscipline[],
}

type CycleFormProps = {
    visible: boolean
    selectedCycle: ICycle | null
    onSubmit: Function
    onCancel: MouseEventHandler<HTMLButtonElement>
}

export function CycleForm(props: CycleFormProps) {
    if (!props.visible) return null;
    const { listaMapaEstudos } = useStudyMap()
    const [disciplines, setDisciplines] = useState<IDiscipline[]>([])
    const [selectedDisciplineId, setSelectedDisciplineId] = useState<number | null>(null)

    const [showTopicForm, setShowTopicForm] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState<ITopicDiscipline | null>(null)
    const [form] = Form.useForm()
    const [topics, setTopics] = useState<ITopicDiscipline[]>([])

    useEffect(() => {
        if (!props.selectedCycle) return

        // Preenche os campos do formulário
        form.setFieldsValue({
            description: props.selectedCycle.description,
            annotation: props.selectedCycle.annotation,
        })

        // Preenche os tópicos
        const listaTopicosRecebida = props.selectedCycle.topics || []
        setTopics(listaTopicosRecebida)
        const disciplinasValidas = listaMapaEstudos.filter(discipline => listaTopicosRecebida.find(t => discipline.topics.find(td => td.id == t.id)))
        const disciplinasComTopicosFiltrados = disciplinasValidas.map(discipline => ({ ...discipline, topics: discipline.topics.filter(dt => listaTopicosRecebida.find(t => t.id === dt.id)) }))
        setDisciplines(disciplinasComTopicosFiltrados)

    }, [props.selectedCycle, listaMapaEstudos, form])

    useEffect(() => {
        const novaListaTopicos = disciplines.reduce<ITopicDiscipline[]>(
            (acc, current) => {
                const topics = current.topics ?? []
                return [...acc, ...topics]
            },
            []
        )

        setTopics(novaListaTopicos)
    }, [disciplines])


    const handleAddTopic = (topic: ITopicDiscipline) => {
        setTopics(prev => [...prev, topic])
    }

    const handleRemoveTopic = (topic: ITopicDiscipline) => {
        setTopics(prev => [...prev.filter(t => topic.id != t.id)])
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

        if (!topics.length) {
            toast.error('Selecione algum tópico para salvar o ciclo')
            return;
        }
        const payload = {
            ...values,
            topics,
        }


        if (props.selectedCycle?.id) {
            payload.id = props.selectedCycle.id
        }

        console.log('OBJETO CICLO RESULTANTE:', payload)
        props.onSubmit(payload)
        setSelectedTopic(null)
    }

    return (
        <Modal
            title={props.selectedCycle ? "Editar Ciclo" : "Incluir Ciclo"}
            open={props.visible}
            onCancel={props.onCancel}
            footer={null} // deixa os botões dentro do form
            destroyOnHidden
            width={'min(800px,80vw)'}
        >

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
                            <Input />
                        </Form.Item>

                        <Form.Item label="Disciplinas">
                            <Select
                                placeholder="Selecione uma disciplina"
                                value={selectedDisciplineId}
                                onSelect={(id) => {
                                    const discipline = listaMapaEstudos.find(d => d.id === id)
                                    if (!discipline) return

                                    setDisciplines(prev => {
                                        console.log({ prev })
                                        console.log({ teste: prev.filter(d => d.id != discipline.id) })
                                        return [...prev.filter(d => d.id != discipline.id), discipline]
                                    }
                                    )

                                    // LIMPA O SELECT
                                    setSelectedDisciplineId(null)
                                }}
                                options={listaMapaEstudos
                                    .filter(d => !disciplines.some(sel => sel.id === d.id))
                                    .map(d => ({
                                        label: d.description,
                                        value: d.id,
                                    }))
                                }
                            />
                        </Form.Item>


                        {disciplines.map((disciplina, i) =>
                            <Card key={disciplina.id} style={{ width: '100%', background: '#FFF', marginBottom: 10 }}
                            >
                                <Row>
                                    <Grid cols="8 8 8 8">
                                        <h5>{disciplina.description}</h5>
                                    </Grid>
                                    <Grid cols="4 4 4 4" style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, paddingBottom: 14 }}>
                                        <PageButton type="primary" danger
                                            onClick={() => {
                                                if (!window.confirm('Deseja realmente excluir a disciplina?')) return;
                                                setDisciplines(prev => prev.filter(d => d.id !== disciplina.id))
                                            }} icon="trash" text="" />
                                    </Grid>
                                </Row>
                                <Row>
                                    <Grid cols="8 8 8 8">
                                        {disciplina.annotation}
                                    </Grid>
                                    <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                                        {disciplina.statusInfo}
                                    </Grid>
                                    {disciplina.topics.map((topico, j) =>
                                        <Card key={j} style={{ background: topico.color, color: '#FFF' }}
                                            styles={{
                                                body: {
                                                    padding: 10,
                                                },
                                            }}
                                        >
                                            <Grid cols="12 12 12 12">
                                                <Row>
                                                    <Grid cols="11 11 11 11">
                                                        <Row>
                                                            <Grid cols="8 8 8 8">
                                                                <h6>{topico.description}</h6>
                                                                {topico.knowledgeScore && topico.knowledgeScore >= 0 ?
                                                                    <>
                                                                        <span className='pe-2'>
                                                                            {KNOWLEDGE_LABELS[topico.knowledgeScore].label}
                                                                        </span>
                                                                        <span>
                                                                            {KNOWLEDGE_LABELS[topico.knowledgeScore].icon}
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    null}
                                                            </Grid>
                                                            <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                                                                {topico.elapsedTime}
                                                            </Grid>
                                                            <Grid cols="12 12 12 12" style={{ textAlign: 'right' }}>
                                                                {topico.score}
                                                            </Grid>
                                                        </Row>

                                                    </Grid>
                                                    <Grid cols="1 1 1 1" className='d-flex justify-content-end align-items-center'>
                                                        <Row>
                                                            <PageButton type="primary" danger
                                                                onClick={() => {
                                                                    if (!window.confirm('Deseja realmente excluir o tópico?')) return;
                                                                    setDisciplines(prev => prev.map(d => {
                                                                        if (d.id !== disciplina.id) return d;
                                                                        const novaListaTopicos = d.topics.filter(t => t.id !== topico.id);
                                                                        return { ...d, topics: novaListaTopicos }

                                                                    }))
                                                                }} icon="trash" text="" />
                                                        </Row>
                                                    </Grid>
                                                </Row>
                                            </Grid>
                                        </Card>
                                    )}
                                </Row>
                            </Card>
                        )}


                        <Row>
                            <Grid cols="6 6 6 6" >
                                <Button color="green" variant="solid" type="primary" icon={<FontAwesomeIcon icon={'check'} />} htmlType="submit" block>
                                    Salvar Ciclo
                                </Button>
                            </Grid>
                            <Grid cols="6 6 6 6" >
                                <PageButton type="primary" danger onClick={props.onCancel} icon="times" text="Cancelar" block />
                            </Grid>
                        </Row>


                    </Form>
                </Row>
            }
        </Modal>
    )
}
