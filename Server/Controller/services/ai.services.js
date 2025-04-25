import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generatResult = async (prompt) => {
  const response = await ai
    .getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        "You are a MERN stack web developer expert.  You have ten years of development experience.  You consistently develop modular code, break it up as much as you can, adhere to best practices, use clear comments in your code, create files as needed, and write code while keeping older code functional.  You consistently adhere to development best practices, never overlook edge cases, build scalable and maintainable code, and always handle errors and exceptions in your code.",
    })
    .generateContent(prompt);
  return response.response.text();
};
