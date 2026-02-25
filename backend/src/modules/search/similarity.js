
//vector brain for similarity search

//How close the question is to the chunk in terms of meaning

export const cosineSimilarity = (a, b) => {
  let dot = 0; // similarity score
  let normA = 0; // magnitude of vector a
  let normB = 0; // magnitude of vector b

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]; // higher dot product means more similar
    normA += a[i] * a[i]; // larger magnitude means more information, but we will normalize it
    normB += b[i] * b[i]; // same for b
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));   // closer to 1 means more similar, closer to 0 means less similar
};