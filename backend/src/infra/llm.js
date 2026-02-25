import OpenAI from 'openai';
import dotenv from 'dotenv';

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})