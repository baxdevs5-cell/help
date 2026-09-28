import { GoogleGenAI } from '@google/genai';

function generateSmartFallback(problem: string, language: string = 'uz') {
  const p = problem.toLowerCase();

  // Tech / Laptop / Device
  if (p.includes('laptop') || p.includes('kompyuter') || p.includes('computer') || p.includes('sekin') || p.includes('slow') || p.includes('ram') || p.includes('ssd') || p.includes('virus') || p.includes('windows') || p.includes('mac')) {
    if (language === 'uz') {
      return {
        category: '💻 Kompyuter va Texnologiya',
        possibleCauses: [
          'Fon rejimida ishlayotgan keraksiz dasturlar va avtomatik yuklanish (Startup)',
          'SSD/HDD xotirasi to‘lib qolganligi (kamida 15-20% bo‘sh joy zarur)',
          'RAM (tezkor xotira) yetishmovchiligi yoki brauzerda ortiqcha tablar',
          'Termopasta eskirganligi yoki sovutish tizimining chang bilan to‘lishi'
        ],
        simpleExplanation: 'Laptopning sekinlashishi ko‘pincha dasturiy axlatlar, bir vaqtda ishlayotgan ortiqcha ilovalar yoki termal qizib ketish sababli yuzaga keladi.',
        stepByStepSolutions: [
          'Ctrl + Shift + Esc bosing va Task Manager (Vazifalar menejeri) orqali keraksiz dasturlarni yoping.',
          'Startup (Avtomatik ishga tushish) bo‘limiga o‘ting va kerak bo‘lmagan ilovalarni (masalan, Spotify, Torrent) o‘chirib qo‘ying.',
          'C: diskini tozalash: Win + R -> cleanmgr yozing va vaqtinchalik fayllarni o‘chiring.',
          'Brauzeringiz keshini tozalang va foydalanilmayotgan kengaytmalarni (extensions) o‘chiring.',
          'Antivirus orqali to‘liq tekshiruv (Full Scan) o‘tkazing.'
        ],
        relatedTools: ['file_size_converter', 'study_timer', 'word_counter'],
        relatedArticles: ['Laptop tezligini 2x oshirish sirlari', 'Windows 11 optimallashtirish', 'SSD tanlash bo‘yicha qo‘llanma'],
        recommendedNextActions: ['Startup dasturlarini tekshirish', 'Diskni tozalash vositasidan foydalanish', 'RAM hajmini tekshirish']
      };
    } else {
      return {
        category: '💻 Computer & Technology',
        possibleCauses: [
          'Too many background apps running on system startup',
          'Low disk storage on main drive (less than 15% free)',
          'RAM exhaustion from heavy browser tabs or memory leaks',
          'Thermal throttling due to dust buildup or aging thermal paste'
        ],
        simpleExplanation: 'Laptops slow down when background processes consume CPU/RAM, when storage is nearly full, or when cooling fans are clogged.',
        stepByStepSolutions: [
          'Press Ctrl + Shift + Esc to open Task Manager and close resource-heavy processes.',
          'Disable non-essential startup apps in the Startup Apps tab.',
          'Run Disk Cleanup (Win + R -> cleanmgr) to purge temporary files.',
          'Ensure ventilation vents are clear and elevate the laptop for better airflow.'
        ],
        relatedTools: ['file_size_converter', 'study_timer'],
        relatedArticles: ['Ultimate Laptop Speed Optimization', 'SSD vs HDD Performance Guide'],
        recommendedNextActions: ['Check Startup programs', 'Free up 15GB on C drive']
      };
    }
  }

  // English Learning
  if (p.includes('english') || p.includes('ingliz') || p.includes('til') || p.includes('grammatika') || p.includes('grammar') || p.includes('vocabulary') || p.includes('so\'z') || p.includes('speaking')) {
    return {
      category: language === 'uz' ? '🗣️ Ingliz tili va Ta\'lim' : '🗣️ English & Education',
      possibleCauses: [
        'Kundalik nutq va tinglash amaliyotining yetishmasligi',
        'So‘zlarni kontekstsiz, alohida yodlashga urinish',
        'Xato qilishdan qo‘rqish va kam gapirish'
      ],
      simpleExplanation: language === 'uz'
        ? 'Til o‘rganish bu ma\'lumot to‘plash emas, balki odat va doimiy amaliyotdir. Har kuni 20 daqiqa haftada bir marta 3 soatdan ancha samaraliroq.'
        : 'Language mastery requires habitual daily input and low-stakes output rather than cramming grammar rules.',
      stepByStepSolutions: [
        'Practice Shadowing technique with podcasts or TED Talks 15 minutes daily.',
        'Learn phrases and collocations rather than standalone words.',
        'Use the HELP HUB English tools and flashcards for spaced repetition.'
      ],
      relatedTools: ['study_timer', 'word_counter'],
      relatedArticles: ['Active Recall Methods for Vocabulary', 'Fluency in 90 Days Framework'],
      recommendedNextActions: ['Start a 25-minute study session', 'Practice 10 flashcards']
    };
  }

  // General default fallback
  return {
    category: language === 'uz' ? '🧠 Umumiy Yordam' : '🧠 General Assistance',
    possibleCauses: [
      language === 'uz' ? 'Muammo bo‘yicha batafsil bosqichlar va tahlil zarur' : 'Detailed analysis and practical steps required'
    ],
    simpleExplanation: language === 'uz'
      ? `HELP HUB siz kiritgan "${problem}" bo‘yicha eng to‘g‘ri yechim va vositalarni aniqladi.`
      : `HELP HUB analyzed your request: "${problem}" and selected the best action plan.`,
    stepByStepSolutions: language === 'uz' ? [
      'Muammoning asosiy sababini aniqlash va ustuvorliklarni belgilash.',
      'HELP HUB asboblar panelidagi tegishli kalkulyator yoki vositani ochish.',
      'Har bir tavsiya qilingan qadamni ketma-ketlikda bajarish.'
    ] : [
      'Identify root causes and break the goal into manageable micro-steps.',
      'Utilize the corresponding interactive tool from HELP HUB Toolkit.',
      'Track progress in your personal HELP HUB dashboard.'
    ],
    relatedTools: ['study_timer', 'percentage_calculator', 'unit_converter'],
    relatedArticles: ['Productivity Essentials', 'Problem-Solving Masterclass'],
    recommendedNextActions: ['Open matching tool', 'Save to Dashboard']
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { problem, language = 'uz' } = req.body || {};
  if (!problem || typeof problem !== 'string') {
    return res.status(400).json({ error: 'Problem description is required' });
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are HELP HUB's Intelligent Diagnostic Engine.
The user describes a problem in language "${language}":
"${problem}"

Analyze this problem and respond ONLY in valid JSON matching this exact schema:
{
  "category": "short category with emoji, e.g. 💻 Kompyuter, 🗣️ Ingliz tili, 💰 Moliya, 🍳 Retseptlar, 🌦️ Ob-havo, 🚗 Avtomobil, 📚 Ta'lim",
  "possibleCauses": ["cause 1", "cause 2", "cause 3"],
  "simpleExplanation": "Clear, friendly explanation in 1-2 sentences in ${language}",
  "stepByStepSolutions": ["step 1", "step 2", "step 3", "step 4"],
  "relatedTools": ["tool_id1", "tool_id2"],
  "relatedArticles": ["article title 1", "article title 2"],
  "recommendedNextActions": ["action 1", "action 2"]
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);
      return res.status(200).json(parsed);
    } catch (err) {
      console.warn('Gemini Vercel serverless error, using smart fallback:', err);
    }
  }

  const fallback = generateSmartFallback(problem, language);
  return res.status(200).json(fallback);
}
