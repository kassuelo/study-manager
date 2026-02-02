import { Card, Modal } from 'antd'
import { Grid } from '../components/Grid'
import { PageButton } from '../components/PageButton'
import { Row } from '../components/Row'
import { CardCycle } from './CardCycle';
import { CardReview } from './CardReview';
import { useStudyCycle } from '../hooks/useStudyCycle';
import { useState } from 'react';
import type { IReview } from '../interfaces/IReview';
import type { ICycle } from '../interfaces/ICycle';
import { CycleForm } from './CycleForm';

export function StudyCycle() {
    // const [openReviewForm, setOpenReviewForm] = useState(false)
    const [openCycleForm, setOpenCycleForm] = useState(false)
    // const [selectedRevisao, setSelectedRevisao] = useState<IReview | null>(null)
    const [selectedCycle, setSelectedCycle] = useState<ICycle | null>(null)
    const { listaRevisaoEstudos, listaCicloEstudos, editarRevisao, excluirRevisao, adicionarCiclo, excluirCiclo, editarCiclo } = useStudyCycle();

    return <>
        {/* Modal do formulário */}
        <Modal
            title={selectedCycle ? "Editar Ciclo" : "Incluir Ciclo"}
            open={openCycleForm}
            onCancel={() => {
                setOpenCycleForm(false);
                setSelectedCycle(null)
            }}
            footer={null} // deixa os botões dentro do form
            destroyOnHidden
            width={'min(800px,80vw)'}
        >
            <CycleForm
                selectedCycle={selectedCycle}
                onCancel={() => setOpenCycleForm(false)}
                onSubmit={(ciclo: ICycle) => {
                    if (selectedCycle) {
                        editarCiclo({ oldCycle: selectedCycle, newCycle: ciclo })
                    } else {
                        adicionarCiclo(ciclo)
                    }
                    setOpenCycleForm(false)
                }
                } />
        </Modal>
        <Card className='pe-3 mb-2' style={{ color: '#FFF', fontWeight: 'bold', background: '#64b2ff' }}>
            <Row>
                <Grid cols="8 8 8 8">
                    <h4>Ciclo de Estudos</h4>
                </Grid>
                <Grid cols="4 4 4 4" style={{ textAlign: 'right' }}>
                    <PageButton onClick={() => setOpenCycleForm(true)} icon="plus" text="Incluir Ciclo" />
                </Grid>
            </Row>
        </Card>
        <Card style={{ boxShadow: '0px 0px 3px 1px #DDF', background: '#ebedf5', margin: 0, padding: 0 }}>
            <Row>
                <Grid cols="12 12 12 12" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {[...listaRevisaoEstudos].map((review, i) =>
                        <CardReview
                            key={i}
                            review={review} />)}
                </Grid>
                <Grid cols="12 12 12 12" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {[...listaCicloEstudos].map((cycle, i) =>
                        <CardCycle
                            key={i}
                            handleEditarCiclo={(ciclo: ICycle) => {
                                setSelectedCycle(ciclo)
                                setOpenCycleForm(true)
                            }}
                            handleExcluirCiclo={(ciclo: ICycle) => {
                                if (!window.confirm('Deseja realmente excluir o ciclo?')) return;
                                excluirCiclo(ciclo)
                            }}
                            cycle={cycle}
                        />)}
                </Grid>
            </Row>
        </Card></>
}