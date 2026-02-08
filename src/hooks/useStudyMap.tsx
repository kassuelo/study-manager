import { useEffect, useState } from "react";
import type { IDiscipline } from "../interfaces/IDiscipline";
import { createDiscipline, deleteDiscipline, getStudyMap, updateDiscipline } from "../services/studyMapService";

import { toast } from "react-toastify";


export function useStudyMap() {
    const [listaMapaEstudos, setListaMapaEstudos] = useState<IDiscipline[]>([])

    async function buscarDados() {
        try {
            const data = await getStudyMap();
            setListaMapaEstudos(data);
        } catch (err: any) {
            console.error(err);
            toast.error("Erro ao buscar disciplinas");
        }
    }

    useEffect(() => {
        buscarDados();
    }, []);

    type submitProps = {
        disciplina: IDiscipline
        callback?: Function
    }

    async function adicionarDisciplina({ disciplina, callback }: submitProps) {
        try {
            await createDiscipline(disciplina)
            buscarDados();
            toast.success("Disciplina cadastrada com sucesso!");
            if (callback) callback();
        } catch (error) {
            console.error(error)
            toast.error("Erro ao cadastrar disciplina");

        }

    }


    async function editarDisciplina({ disciplina, callback }: submitProps) {
        try {
            await updateDiscipline(disciplina)
            buscarDados();
            toast.success("Disciplina alterada com sucesso!");
            if (callback) callback();
        } catch (error) {
            console.error(error)
            toast.error("Erro ao alterar disciplina");

        }

    }

    async function excluirDisciplina(id: number | undefined) {
        try {
            if (!id) throw new TypeError("id inválido")
            await deleteDiscipline(id)
            buscarDados();
            toast.success("Disciplina excluida com sucesso!");

        } catch (error) {
            console.error(error)
            toast.error("Erro ao excluir disciplina");

        }
    }

    return { listaMapaEstudos, adicionarDisciplina, editarDisciplina, excluirDisciplina }
}