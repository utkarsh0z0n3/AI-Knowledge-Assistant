import Document from "./document.model.js";
import { extractPdfText } from "../ingestion/pdf.extractor.js";
import { splitsIntoChunks } from "../ingestion/chunker.js";
import Chunk from "../ingestion/chunk.model.js";
import { generateEmbedding } from "../ingestion/embedding.service.js";
import Embedding from "../ingestion/embedding.model.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;

    const text = await extractPdfText(file.path);

    const doc = await Document.create({
      title: file.originalname,
      file_path: file.path,
      uploaded_by: req.user.id,
      content: text,
    });

    const chunks = splitsIntoChunks(text);

    await Promise.all(
      chunks.map(async (chunk, index) => {
        const chunkRow = await Chunk.create({
          document_id: doc.id,
          content: chunk,
          chunk_index: index,
        });

        const vector = await generateEmbedding(chunk);

        await Embedding.create({
          chunk_id: chunkRow.id,
          vector,
        });
      }),
    );

    res.status(201).json(doc);
  } catch (err) {
    console.error("Upload failed ❌", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
