import { useEffect, useState } from "react";
import type { IDiscipline } from "../interfaces/IDiscipline";
import { BASE_URL } from "../config/config";

interface StudyCycleResponse {
    subjects: IDiscipline[];
}

type EditarDisciplinaParams = {
    oldDiscipline: IDiscipline
    newDiscipline: IDiscipline
}

export function useStudyMap() {
    const [listaMapaEstudos, setListaMapaEstudos] = useState<IDiscipline[]>([])

    useEffect(() => {
        async function buscarDados() {
            try {
                const response = await fetch(`${BASE_URL}/mock-api/study-map`);
                const data: StudyCycleResponse = await response.json();
                console.log(data)
                setListaMapaEstudos(data.subjects);
            } catch (error) {
                console.error("Erro ao buscar ciclo de estudos:", error);
            }
        }

        buscarDados();
    }, []);

    function adicionarDisciplina(disciplina: IDiscipline) {
        setListaMapaEstudos(prev => [...prev, disciplina])
    }


    function editarDisciplina({ oldDiscipline, newDiscipline }: EditarDisciplinaParams) {
        excluirDisciplina(oldDiscipline)
        adicionarDisciplina(newDiscipline)
    }

    function excluirDisciplina(disciplina: IDiscipline) {
        setListaMapaEstudos(prev => [...prev.filter(d => JSON.stringify(d) !== JSON.stringify(disciplina))])
    }

    return { listaMapaEstudos, adicionarDisciplina, editarDisciplina, excluirDisciplina }
}