import { useEffect, useState } from "react";
import type { IReview } from "../interfaces/IReview";
import type { ICycle } from "../interfaces/ICycle";
import { createCycle, deleteCycle, getStudyCycle, updateCycle } from "../services/studyCycleService ";
import { toast } from "react-toastify";


export function useStudyCycle() {
    const [listaRevisaoEstudos, setListaRevisaoEstudos] = useState<IReview[]>([]);
    const [listaCicloEstudos, setListaCicloEstudos] = useState<ICycle[]>([]);

    async function buscarDados() {
        try {
            const { cycles, reviews } = await getStudyCycle();
            setListaRevisaoEstudos(reviews)
            setListaCicloEstudos(cycles);
        } catch (err: any) {
            console.error(err);
            toast.error("Erro ao buscar ciclo");
        }
    }

    useEffect(() => {
        buscarDados();
    }, []);


    async function adicionarCiclo(ciclo: ICycle) {
        try {
            await createCycle(ciclo)
            buscarDados();
            toast.success("Ciclo cadastrada com sucesso!");

        } catch (error) {
            console.error(error)
            toast.error("Erro ao cadastrar ciclo");

        }

    }


    async function editarCiclo(ciclo: ICycle) {
        try {
            await updateCycle(ciclo)
            buscarDados();
            toast.success("Ciclo alterada com sucesso!");

        } catch (error) {
            console.error(error)
            toast.error("Erro ao alterar ciclo");

        }

    }

    async function excluirCiclo(id: number | undefined) {
        try {
            if (!id) throw new TypeError("id inválido")
            await deleteCycle(id)
            buscarDados();
            toast.success("Ciclo excluida com sucesso!");

        } catch (error) {
            console.error(error)
            toast.error("Erro ao excluir ciclo");

        }
    }

    return {
        listaRevisaoEstudos,
        listaCicloEstudos,
        // adicionarRevisao esse é incluido pelo back
        adicionarCiclo,
        excluirCiclo,
        editarCiclo
    };
}
