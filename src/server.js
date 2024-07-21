import express, { response } from 'express';
import geminiApi from './gemini-api.js';

const app = express();
const port = 3000;
app.use(express.json());

app.post('/gemini/prompt', async (req, res) => {
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ error: 'Invalid request: "prompt" is required.' });
    }
  
    try {
    //   const responseGemini = await geminiApi.run(prompt); 

    //   res.status(200).json({ response: responseGemini });
        const { success, text, message } = await geminiApi.run(prompt);
        if (success) {
            res.status(200).json({ response: text });
        } else {
            res.status(400).json({ error: message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
