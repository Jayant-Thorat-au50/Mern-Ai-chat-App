
import { generatResult } from "./services/ai.services.js";

export const generateDataContent = async (req, res) => {
    try {
      const { prompt } = req.query;
      const result = await generatResult(prompt);
      return res.send(result);
    } catch (error) {
      return res.send({ error: error.message });
    }
  }