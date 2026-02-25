import { openai } from "../../infra/llm.js";


export const generateEmbedding = async(text) => {
    const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    return res.data[0].embedding;
}