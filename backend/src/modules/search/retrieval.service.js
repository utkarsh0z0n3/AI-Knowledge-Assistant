import Embedding from "../ingestion/embedding.model.js";
import Chunk from "../ingestion/chunk.model.js";
import { cosineSimilarity } from "./similarity.js";
import { generateEmbedding } from "../ingestion/embedding.service.js";

export const retrieveRelevantChunks = async (question, topK = 3) => {
  const questionVector = await generateEmbedding(question);
  // we convert the question into a vector using the same embedding model used for chunks

  const embeddings = await Embedding.findAll({ raw: true });
  // we fetch all the chunk embeddings from the database. Each embedding has a chunk_id and a vector.

  const scored = embeddings.map((e) => ({
    chunk_id: e.chunk_id,
    score: cosineSimilarity(questionVector, e.vector),
  }));

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, topK);

  const chunks = await Chunk.findAll({
    where: { id: top.map((t) => t.chunk_id) },
    raw: true,
  });
  // we retrieve the actual chunk texts from the database using the chunk_ids of the top scored embeddings.

  return chunks.map((c, i) => ({
    ...c,
    score: top[i]?.score || 0,
  }));
};
