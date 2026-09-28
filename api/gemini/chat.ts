import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, category = 'General', language = 'uz', history = [] } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const systemInstruction = `You are HELP HUB AI, a friendly, ultra-helpful, modern digital assistant for the HELP HUB platform ("Odamlarga kerakli yordam, bir joyda").
Category focus: ${category}.
Current user language: ${language}.
Always provide direct, structured, practical answers with clear steps, helpful examples, and mention relevant HELP HUB tools (e.g. Budget Calculator, BMI Calculator, Pomodoro Study Timer, Unit Converter, Recipe Finder) when appropriate.
Keep tone professional, encouraging, and concise.`;

      const contents = [
        ...history.slice(-6).map((h: { role: string; text: string }) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.status(200).json({
        reply: response.text || '',
        suggestedNextSteps: [
          language === 'uz' ? 'Bu bo‘yicha qo‘shimcha ma\'lumot' : 'More details on this',
          language === 'uz' ? 'Amaliy qadamlar rejasi' : 'Practical action plan',
          language === 'uz' ? 'Tegishli vositani ochish' : 'Open related tool'
        ]
      });
    } catch (err) {
      console.warn('Gemini chat error in serverless function:', err);
    }
  }

  return res.status(200).json({
    reply: language === 'uz'
      ? "HELP HUB AI yordamchisiga xush kelibsiz! Savolingiz tahlil qilindi. Asosiy vositalarimiz (Kalkulyatorlar, Taymer, Retseptlar qidiruvchi) yordamida ushbu vazifani tezda hal qilishingiz mumkin."
      : "Welcome to HELP HUB AI! Your request was received. You can quickly accomplish this using our toolkit (Calculators, Pomodoro Timer, or Recipe Finder).",
    suggestedNextSteps: [
      language === 'uz' ? 'Tegishli vositani ochish' : 'Open related tool',
      language === 'uz' ? 'Dashboardda rejalashtirish' : 'Add to Dashboard'
    ]
  });
}
