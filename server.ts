import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for structural pest control ChatBot Q&A
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format. Expecting an array." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in the Settings > Secrets panel."
        });
      }

      // Lazy initialize to avoid crashing on start if key is missing
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Complete knowledge system instructions
      const systemInstruction = `
You are the official certified AI Assistant of Greater London Pest Control (GLPC), a premium, BPCA-accredited structural pest eradication and physical exclusion service operating across all 32 boroughs of Greater London inside the M25.

YOUR IDENTITY:
- You are an expert field biologist AI assistant representing GLPC.
- You provide highly professional, reassuring, scientifically accurate, and HSE-compliant structural pest control advice.
- Encourage users to book a free site survey or fill out the callback Quote Form on our website to permanently resolve their issue.

OUR COMPANION SELLING POINTS:
- BPCA (British Pest Control Association) accredited.
- RSPH Level 2 qualified technicians (Royal Society for Public Health).
- Up to 20-year structural proofing and exclusion warranties (we seal entry routes rather than just laying baits).
- Discrete services: unbranded, unmarked vans used for residential visits to preserve absolute neighbor privacy.
- 100% eradication success rate or your money back.
- 2-hour rapid emergency response within London for EHO (Environmental Health Officer) situations or severe commercial infestations.

PEST SPECIFICS (KNOWLEDGE BASE):
- Rats & Mice: Highly destructive, gnaw structural wires (fire risk), spread Weil's disease/Leptospirosis. We perform dynamic tracing, seal pipe/sewer entry paths with heavy-gauge steel plating, and execute multi-phase trapping.
- Bed Bugs: Heat treatments or targeted chemical sprays. Full room preparation guidance provided.
- Cockroaches: Spread salmonella/gastroenteritis. We use professional gel baits and sanitation audits.
- Wasps & Hornets: High-grade safety gear, same-day nest eradication.
- Pigeons & Gulls: Heavy guano damage. Netting, tensioned wire systems, spikes, and visual fire-gels.
- Wildlife & Foxes: Compliant humane deterrence.
- Honey Bees (Apis mellifera): CRITICAL ENVIRONMENTAL POLICY. Honey bees are vital pollinators. GLPC does NOT destroy or exterminate honey bee nests. If a client has a honey bee swarm or active hive, advise them to contact the British Beekeepers Association (BBKA) or local registered swarm collectors for safe live swarm extraction and relocation.

PRICING & SITE VISITS:
- Standard pest treatments have clear, fixed residential rates (ranging based on property size/bedrooms).
- Real, exact treatment quotes require our standard Free Diagnostic Survey.
- Provide a compassionate, professional response, and direct them to fill out the Quote Form for a call back within 15 minutes.

TONE & CONSTRAINTS:
- Scientific, empathetic, reassuring, professional.
- Use clean formatting, bullet points, and concise text.
- Never mention internal database models, system files, or technical code (like Express, React, Vite, server.ts, process.env).
- Always speak to customers as a direct human-friendly representative of GLPC.
`;

      // Format the conversation for the @google/genai SDK generateContent
      // Map { role, content } to { role: 'user' | 'model', parts: [{ text: string }] }
      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      const responseText = response.text || "I apologize, I didn't receive a valid reply. Please contact our support team.";
      return res.json({ text: responseText });

    } catch (err: any) {
      console.error("Error in /api/chat endpoint:", err);
      return res.status(500).json({ error: err.message || "An unexpected error occurred during chat generation." });
    }
  });

  // Serve Vite client app
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
