import { BASE_URL } from "../config/config";
import type { ICycle } from "../interfaces/ICycle";
import type { IReview } from "../interfaces/IReview";

interface StudyCycleResponse {
    reviews: IReview[];
    cycles: ICycle[];
}
// Buscar lista
export async function getStudyCycle(): Promise<StudyCycleResponse> {
    const response = await fetch(`${BASE_URL}/v1/study-cycle`);

    if (!response.ok) {
        throw new Error("Erro ao buscar mapa de estudos");
    }

    const data: StudyCycleResponse = await response.json();

    return data; // conforme seu backend
}

export async function createCycle(data: ICycle) {
    console.log("POST CICLO");

    const { topics, ...dados } = data;

    const dadosMapeados = {
        ...dados,
        topics: topics.map(t => ({ idSubject: t.idSubject, idTopic: t.idTopic }))
    }

    console.log(dadosMapeados);

    const response = await fetch(`${BASE_URL}/v1/study-cycle/cycle`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosMapeados),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar ciclo");
    }

    return response.json();
}

export async function updateCycle(data: ICycle) {
    console.log("PUT CICLO");

    const { topics, id, ...dados } = data;

    const dadosMapeados = {
        ...dados,
        topics: topics.map(t => ({ idSubject: t.idSubject, idTopic: t.idTopic }))
    }

    console.log(dadosMapeados);

    const response = await fetch(`${BASE_URL}/v1/study-cycle/cycle?cycleId=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar ciclo");
    }

    return response.json();
}

// Deletar ciclo por ID
export async function deleteCycle(id: number) {
    const response = await fetch(
        `${BASE_URL}/v1/study-cycle/cycle?cycleId=${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro ao deletar ciclo");
    }

    // Se backend não retornar body, não chama .json()
    return true;
}
