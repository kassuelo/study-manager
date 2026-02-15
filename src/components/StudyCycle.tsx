import { Card } from 'antd'
import { Grid } from '../components/Grid'
import { PageButton } from '../components/PageButton'
import { Row } from '../components/Row'
import { CardCycle } from './CardCycle';
import { CardReview } from './CardReview';
import { useStudyCycle } from '../hooks/useStudyCycle';
import { useState } from 'react';
import type { ICycle } from '../interfaces/ICycle';
import { CycleForm } from './CycleForm';
import { StudyRecordForm } from './StudyRecordForm';
import type { IStudyRecord } from '../interfaces/IStudyRecord';
import type { IReviewRecord } from '../interfaces/IReviewRecord';
import { ReviewRecordForm } from './ReviewRecordForm';

export function StudyCycle() {
    const [openCycleForm, setOpenCycleForm] = useState(false)
    const [openReviewRecordForm, setOpenReviewRecordForm] = useState(false)
    const [openStudyRecordForm, setOpenStudyRecordForm] = useState(false)
    const [selectedCycle, setSelectedCycle] = useState<ICycle | null>(null)
    const [selectedStudyRecord, setSelectedStudyRecord] = useState<any | null>(null)
    const [selectedReviewRecord, setSelectedReviewRecord] = useState<any | null>(null)
    const { listaRevisaoEstudos, listaCicloEstudos, adicionarRegistroEstudo, adicionarCiclo, excluirCiclo, editarCiclo } = useStudyCycle();


    function handleCancelCycleForm() {
        setOpenCycleForm(false);
        setSelectedCycle(null)
    }

    function handleSubmitCycleForm(ciclo: ICycle) {
        if (selectedCycle) {
            editarCiclo(ciclo);
        } else {
            adicionarCiclo(ciclo)
        }
        setOpenCycleForm(false)
        setSelectedCycle(null)
    }

    function handleCancelStudyRecordForm() {
        setOpenStudyRecordForm(false)
        setSelectedStudyRecord(null)
    }

    function handleSubmitStudyRecordForm(studyRecord: any) {
        adicionarRegistroEstudo(studyRecord)
        setOpenStudyRecordForm(false)
        setSelectedStudyRecord(null)
    }

    return <>
        <CycleForm
            visible={openCycleForm}
            selectedCycle={selectedCycle}
            onCancel={handleCancelCycleForm}
            onSubmit={handleSubmitCycleForm}
        />
        <ReviewRecordForm
            visible={openStudyRecordForm}
            selectedReviewRecord={selectedReviewRecord}
            onCancel={handleCancelStudyRecordForm}
            onSubmit={handleSubmitStudyRecordForm}
        />
        <StudyRecordForm
            visible={openStudyRecordForm}
            selectedStudyRecord={selectedStudyRecord}
            onCancel={handleCancelStudyRecordForm}
            onSubmit={handleSubmitStudyRecordForm}
        />
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
                <Grid cols="12 12 12 12" style={{ maxHeight: window.innerWidth < 768 ? 300 : '70vh', overflowY: 'auto' }}>
                    {[...listaRevisaoEstudos].map((review, i) =>
                        <CardReview
                            key={i}
                            handleRegistrarEstudo={(reviewRecord: IReviewRecord) => {
                                setSelectedReviewRecord(reviewRecord)
                                setOpenReviewRecordForm(true);
                            }}
                            review={review} />)}
                    {[...listaCicloEstudos].map((cycle, i) =>
                        <CardCycle
                            key={i}
                            handleRegistrarEstudo={(studyRecord: IStudyRecord) => {
                                setSelectedStudyRecord(studyRecord)
                                setOpenStudyRecordForm(true);

                            }}
                            handleEditarCiclo={(ciclo: ICycle) => {
                                setSelectedCycle(ciclo)
                                setOpenCycleForm(true)
                            }}
                            handleExcluirCiclo={(id: number) => {
                                if (!window.confirm('Deseja realmente excluir o ciclo?')) return;
                                excluirCiclo(id)
                            }}
                            cycle={cycle}
                        />)}
                </Grid>
            </Row>
        </Card></>
}