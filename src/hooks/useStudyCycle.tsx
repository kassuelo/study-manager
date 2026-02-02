import { useEffect, useState } from "react";
import type { IReview } from "../interfaces/IReview";
import type { ICycle } from "../interfaces/ICycle";
import { BASE_URL } from "../config/config";

interface StudyCycleResponse {
    reviews: IReview[];
    cycles: ICycle[];
}

type EditarReviewParams = {
    oldReview: IReview
    newReview: IReview
}

type EditarCycleParams = {
    oldCycle: ICycle
    newCycle: ICycle
}

export function useStudyCycle() {
    const [listaRevisaoEstudos, setListaRevisaoEstudos] = useState<IReview[]>([]);
    const [listaCicloEstudos, setListaCicloEstudos] = useState<ICycle[]>([]);

    useEffect(() => {
        async function buscarDados() {
            try {
                const response = await fetch(`${BASE_URL}/mock-api/study-cycle`);
                const data: StudyCycleResponse = await response.json();
                console.log(data)
                setListaRevisaoEstudos(data.reviews);
                setListaCicloEstudos(data.cycles);
            } catch (error) {
                console.error("Erro ao buscar ciclo de estudos:", error);
            }
        }

        buscarDados();
    }, []);

    function adicionarCiclo(ciclo: ICycle) {
        setListaCicloEstudos(prev => [...prev, ciclo]);
    }

    function excluirCiclo(ciclo: ICycle) {
        setListaCicloEstudos(prev => [...prev.filter(d => JSON.stringify(d) !== JSON.stringify(ciclo))])
    }

    function editarCiclo({ oldCycle, newCycle }: EditarCycleParams) {
        excluirCiclo(oldCycle)
        adicionarCiclo(newCycle)
    }


    function adicionarRevisao(revisao: IReview) {
        setListaRevisaoEstudos(prev => [...prev, revisao]);
    }

    function excluirRevisao(revisao: IReview) {
        setListaRevisaoEstudos(prev => [...prev.filter(d => JSON.stringify(d) !== JSON.stringify(revisao))])
    }

    function editarRevisao({ oldReview, newReview }: EditarReviewParams) {
        excluirRevisao(oldReview)
        adicionarRevisao(newReview)
    }




    return {
        listaRevisaoEstudos,
        listaCicloEstudos,
        // adicionarRevisao esse é incluido pelo back
        editarRevisao,
        excluirRevisao,
        adicionarCiclo,
        excluirCiclo,
        editarCiclo
    };
}
