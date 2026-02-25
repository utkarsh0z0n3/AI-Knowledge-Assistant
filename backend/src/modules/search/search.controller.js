import { retrieveRelevantChunks } from "./retrieval.service.js";
import {openai} from "../../infra/llm.js";
import Chat from "../chat/chat.model.js";

export const askQuestion = async(req,res) => {
    try{
        const {question} =  req.body;

        const cached = await Chat.findOne({
            where: {user_id: req.user.id , question}
        });

        if(cached){
            return res.json({
                answer: cached.answer,
                cached: true,
            });
        }

        const chunks = await retrieveRelevantChunks(question);
        // we get the most relevant chunks from the database for the given question.

        const context  = chunks.map(c => c.content).join("\n\n");
        // we combine the retrieved chunks into a single context string that will be fed to the LLM.

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {  role: "system",
                content: "Answer using provided context only"
              },
              {
                role: "user",
                content: `Context: \n${context}\n\n Question: ${question}`,
              },
            ]  , 
        });

        await Chat.create({
            user_id: req.user.id,
            question,
            answer: completion.choices[0].message.content,
        })

        res.json({
            answer: completion.choices[0].message.content,
            sources: chunks.map(c => ({
                id: c.id,
                preview: c.content.slice(0,100) + "...",
            })),
        });
    }
    catch(err){
        console.error("Question answering failed ❌", err);
        res.status(500).json({ message: "Question answering failed" });
    }

}