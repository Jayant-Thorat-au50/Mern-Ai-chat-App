import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI("AIzaSyBbWVX8UFINcbgBrQn9EFiDVvCI1jlfeRQ");

export const generatResult = async (prompt) => {
  const result = await ai
    .getGenerativeModel({ model: "gemini-2.0-flash" })
    .generateContent(prompt);
  return result.response.text();
};
