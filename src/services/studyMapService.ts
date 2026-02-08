import { BASE_URL } from "../config/config";
import type { IDiscipline } from "../interfaces/IDiscipline";

interface StudyCycleResponse {
    subjects: IDiscipline[];
}

// Buscar lista
export async function getStudyMap(): Promise<IDiscipline[]> {
    const response = await fetch(`${BASE_URL}/v1/study-map`);

    if (!response.ok) {
        throw new Error("Erro ao buscar mapa de estudos");
    }

    const data: StudyCycleResponse = await response.json();

    return data.subjects; // conforme seu backend
}

export async function createDiscipline(data: IDiscipline) {
    console.log("POST DISCIPLINA");

    console.log(data);

    const response = await fetch(`${BASE_URL}/v1/study-map/subject`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar disciplina");
    }

    return response.json();
}

export async function updateDiscipline(data: IDiscipline) {
    console.log("PUT DISCIPLINA");

    const { id, ...dados } = data;
    console.log({id,dados});

    const response = await fetch(`${BASE_URL}/v1/study-map/subject?subjectId=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar disciplina");
    }

    return response.json();
}

// Deletar disciplina por ID
export async function deleteDiscipline(id: number) {
    const response = await fetch(
        `${BASE_URL}/v1/study-map/subject?subjectId=${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro ao deletar disciplina");
    }

    // Se backend não retornar body, não chama .json()
    return true;
}
