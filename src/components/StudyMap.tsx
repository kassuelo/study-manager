import { Card, Modal } from 'antd'
import { Grid } from '../components/Grid'
import { PageButton } from '../components/PageButton'
import { Row } from '../components/Row'
import { useState } from 'react'
import { DisciplineForm } from './DisciplineForm'
import { useStudyMap } from '../hooks/useStudyMap'
import { KNOWLEDGE_LABELS } from './TopicForm'
import type { IDiscipline } from '../interfaces/IDiscipline'



export function StudyMap() {
    const [openForm, setOpenForm] = useState(false)
    const [selectedDiscipline, setSelectedDiscipline] = useState<IDiscipline | null>(null)
    const { listaMapaEstudos, adicionarDisciplina, editarDisciplina, excluirDisciplina } = useStudyMap()
    return (
        <>
            {/* Modal do formulário */}
            <Modal
                title={selectedDiscipline ? "Editar Disciplina": "Nova Disciplina"}
                open={openForm}
                onCancel={() => {
                    setOpenForm(false);
                    setSelectedDiscipline(null)
                }}
                footer={null} // deixa os botões dentro do form
                destroyOnHidden
                width={'min(800px,80vw)'}
            >
                <DisciplineForm
                    selectedDiscipline={selectedDiscipline}
                    onCancel={() => setOpenForm(false)}
                    onSubmit={(disciplina: IDiscipline) => {
                        if (selectedDiscipline) {
                            editarDisciplina({ oldDiscipline: selectedDiscipline, newDiscipline: disciplina })
                        } else {
                            adicionarDisciplina(disciplina)
                        }
                        setOpenForm(false)
                    }
                    } />
            </Modal>
            <Card className='pe-3 mb-2' style={{ color: '#FFF', fontWeight: 'bold', background: '#02d48a' }}>
                <Row>
                    <Grid cols="8 8 8 8">
                        <h4>Mapa de Estudos</h4>
                    </Grid>
                    <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                        <PageButton onClick={() => setOpenForm(true)} icon="plus" text="Incluir Disciplina" />
                    </Grid>
                </Row>
            </Card>
            <Card style={{ boxShadow: '0px 0px 3px 1px #DDF', background: '#ebedf5', margin: 0, padding: 0 }}>
                <Row>
                    <Grid cols="12 12 12 12" style={{ maxHeight: window.innerWidth < 768 ? 300: '70vh', overflowY: 'auto' }}>
                        {listaMapaEstudos.map((item, i) =>
                            <Card key={i} style={{ width: '100%', background: '#FFF', marginBottom: 10 }}
                            >
                                <Row>
                                    <Grid cols="8 8 8 8">
                                        <h5>{item.description}</h5>
                                    </Grid>
                                    <Grid cols="4 4 4 4" style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, paddingBottom: 14 }}>
                                        <PageButton type="primary"
                                            style={{ background: '#ffb950' }}
                                            onClick={() => {
                                                setSelectedDiscipline(item)
                                                setOpenForm(true)
                                            }} icon="edit" text="" />
                                        <PageButton type="primary" danger
                                            onClick={() => {
                                                if (!window.confirm('Deseja realmente excluir a disciplina?')) return;
                                                excluirDisciplina(item)
                                            }} icon="trash" text="" />
                                    </Grid>
                                </Row>
                                <Row>
                                    <Grid cols="8 8 8 8">
                                        {item.annotation}
                                    </Grid>
                                    <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                                        {item.statusInfo}
                                    </Grid>
                                    <Grid cols="12 12 12 12" >
                                        {item.topics.map((item, j) =>
                                            <Card key={j} style={{ background: item.rgb, color: '#FFF' }}
                                                styles={{
                                                    body: {
                                                        padding: 10,
                                                    },
                                                }}
                                            >
                                                <Row>
                                                    <Grid cols="8 8 8 8">
                                                        <h6>{item.description}</h6>
                                                        {item.knowledgeScore && item.knowledgeScore >= 0 ?
                                                            <>
                                                                <span className='pe-2'>
                                                                    {KNOWLEDGE_LABELS[item.knowledgeScore].label}
                                                                </span>
                                                                <span>
                                                                    {KNOWLEDGE_LABELS[item.knowledgeScore].icon}
                                                                </span>
                                                            </>
                                                            :
                                                            null}
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
                        )}
                    </Grid>
                </Row>
            </Card>
        </>
    );
}