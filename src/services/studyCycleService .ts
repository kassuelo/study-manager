import { BASE_URL } from "../config/config";
import type { ICycle } from "../interfaces/ICycle";
import type { IReview } from "../interfaces/IReview";
import type { IReviewRecord } from "../interfaces/IReviewRecord";
import type { IStudyRecord } from "../interfaces/IStudyRecord";

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
        topics: topics.map(t => t.id)
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

}

export async function createStudyRecord(data: IStudyRecord) {
    console.log("POST REGISTRO ESTUDO");

    const { cycleId, topicId, disciplineDescription, topicDescription, ...dados } = data;


    console.log(dados);

    const response = await fetch(`${BASE_URL}/v1/study-record?cycleId=${cycleId}&topicId=${topicId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        console.log(response)
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar registro de estudo");
    }

}

export async function createReviewRecord(data: IReviewRecord) {
    console.log("POST REGISTRO REVISÃO");

    const { topicId, disciplineDescription, topicDescription, ...dados } = data;


    console.log(dados);

    const response = await fetch(`${BASE_URL}/v1/review-record?topicId=${topicId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    if (!response.ok) {
        console.log(response)
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar registro de revisão");
    }

}

export async function updateCycle(data: ICycle) {
    console.log("PUT CICLO");

    const { id, topics, ...dados } = data;

    const dadosMapeados = {
        ...dados,
        topics: topics.map(t => t.id)
    }

    console.log(dadosMapeados);

    const response = await fetch(`${BASE_URL}/v1/study-cycle/cycle?cycleId=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosMapeados),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar ciclo");
    }

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
