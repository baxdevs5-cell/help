import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI client if key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (err) {
    console.error('Error initializing GoogleGenAI:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'HELP HUB',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString()
  });
});

// Comprehensive offline / fallback knowledge engine
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
    } else if (language === 'ru') {
      return {
        category: '💻 Компьютеры и Технологии',
        possibleCauses: [
          'Много фоновых программ в автозагрузке Windows/Mac',
          'Переполненный системный диск (меньше 15% свободного места)',
          'Нехватка оперативной памяти (RAM) из-за множества вкладок',
          'Перегрев процессора и засорение кулеров пылью'
        ],
        simpleExplanation: 'Замедление ноутбука чаще всего вызвано фоновыми процессами, нехваткой свободного места на SSD/HDD или перегревом.',
        stepByStepSolutions: [
          'Откройте Диспетчер задач (Ctrl + Shift + Esc) и снимите ресурсоемкие задачи.',
          'Перейдите во вкладку «Автозагрузка» и отключите лишние программы.',
          'Очистите диск от временных файлов (Win + R -> cleanmgr).',
          'Проверьте температуру процессора и очистите вентиляцию от пыли.'
        ],
        relatedTools: ['file_size_converter', 'study_timer'],
        relatedArticles: ['Как ускорить ноутбук на 50%', 'Очистка SSD без потери данных'],
        recommendedNextActions: ['Очистить автозагрузку', 'Проверить свободное место']
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

  // English / Language Learning
  if (p.includes('english') || p.includes('ingliz') || p.includes('til') || p.includes('grammatika') || p.includes('grammar') || p.includes('vocabulary') || p.includes('so\'z') || p.includes('speaking')) {
    if (language === 'uz') {
      return {
        category: '🗣️ Ingliz tili va Ta\'lim',
        possibleCauses: [
          'Kundalik nutq va tinglash amaliyotining yetishmasligi',
          'So‘zlarni kontekstsiz, alohida yodlashga urinish',
          'Xato qilishdan qo‘rqish va kam gapirish',
          'Tartibsiz, maqsadsiz o‘rganish tizimi'
        ],
        simpleExplanation: 'Til o‘rganish bu ma\'lumot to‘plash emas, balki odat va doimiy amaliyotdir. Har kuni 20 daqiqa haftada bir marta 3 soatdan ancha samaraliroq.',
        stepByStepSolutions: [
          'Har kuni 10 ta yangi so‘zni gap ichida ishlating va ovoz chiqarib ayting.',
          'Shadowing usuli: Inglizcha podkast yoki videoni eshitib, ketidan aynan qaytaring.',
          'HELP HUB English bo‘limidagi lug‘at va mini-testlardan har kuni foydalaning.',
          'O‘zingiz bilan ingliz tilida o‘ylashni va oddiy harakatlaringizni tasvirlashni boshlang.'
        ],
        relatedTools: ['study_timer', 'word_counter'],
        relatedArticles: ['Ingliz tilida tez gapirishning 5 siri', 'So‘zlarni xotirada saqlash formulasi'],
        recommendedNextActions: ['25 daqiqalik Pomodoro mashg‘ulotini boshlash', 'Lug‘at kartalarini ko‘rib chiqish']
      };
    } else {
      return {
        category: '🗣️ English & Education',
        possibleCauses: [
          'Lack of consistent daily listening and speaking exposure',
          'Memorizing isolated vocabulary lists without context',
          'Fear of making mistakes in real conversations'
        ],
        simpleExplanation: 'Language mastery requires habitual daily input and low-stakes output rather than cramming grammar rules.',
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
  }

  // Food / Recipes / Cooking
  if (p.includes('tuxum') || p.includes('kartoshka') || p.includes('pishir') || p.includes('ovqat') || p.includes('recipe') || p.includes('egg') || p.includes('potato') || p.includes('food') || p.includes('eda') || p.includes('kartosh')) {
    if (language === 'uz') {
      return {
        category: '🍳 Retseptlar va Oshxona',
        possibleCauses: [
          'Mavjud masalliqlardan to‘g‘ri foydalanish g‘oyalari kerakligi'
        ],
        simpleExplanation: 'Tuxum va kartoshka — dunyo oshxonasidagi eng mashhur va to‘yimli uyg‘unliklardan biridir (Tortilla, Draiki, Qovurma).',
        stepByStepSolutions: [
          'Ispancha Tortilla: Kartoshkani yupqa parrak qilib qovuring, ustiga ko‘pirtirilgan tuxum solib past olovda pishiring.',
          'Kartoshkali quymoq (Draniki): Kartoshkani qirg‘ichdan o‘tkazing, 1 ta tuxum, tuz, murch va bir qoshiq un qo‘shib qovuring.',
          'Klassik qovurma: Kartoshkani kubik shaklida qovurib, tayyor bo‘lishidan 2 daqiqa oldin ustiga tuxum chaqing.'
        ],
        relatedTools: ['weight_converter', 'countdown_timer'],
        relatedArticles: ['15 daqiqada tayyor bo‘ladigan 7 ta yegulik', 'Tez va arzon kechki ovqatlar'],
        recommendedNextActions: ['Retseptlar bo‘limida masalliqlarni tanlash', 'Tayyorlash taymerini yoqish']
      };
    } else {
      return {
        category: '🍳 Recipes & Cooking',
        possibleCauses: [
          'Finding creative, delicious meals with available pantry ingredients'
        ],
        simpleExplanation: 'Eggs and potatoes form the backbone of iconic dishes like Spanish omelets, hash browns, and frittatas.',
        stepByStepSolutions: [
          'Spanish Potato Omelet (Tortilla): Thinly slice potatoes, gently fry in oil, fold in whisked eggs, and cook until golden.',
          'Crispy Potato Hash: Grate or cube potatoes, crisp in butter/oil, and top with fried eggs and black pepper.',
          'Potato Frittata: Combine sliced boiled potatoes with herbs and beaten eggs, bake or pan-fry.'
        ],
        relatedTools: ['weight_converter', 'countdown_timer'],
        relatedArticles: ['Pantry-to-Plate Quick Meals', 'The Perfect Crispy Potato Technique'],
        recommendedNextActions: ['Select ingredients in Recipe Finder', 'Set 15-minute cooking timer']
      };
    }
  }

  // Money / Budget / Percentage / Currency
  if (p.includes('pul') || p.includes('money') || p.includes('foiz') || p.includes('budget') || p.includes('jamg') || p.includes('savings') || p.includes('valyuta') || p.includes('doll')) {
    if (language === 'uz') {
      return {
        category: '💰 Moliya va Jamg‘arma',
        possibleCauses: [
          'Xarajatlar hisobini yuritmaslik va mayda chiqimlarning ko‘pligi',
          'Aniq oylik byudjet va jamg‘arma rejasining yo‘qligi'
        ],
        simpleExplanation: 'Moliya erkinligi daromad miqdoriga emas, daromadni taqsimlash va tejash tizimiga (50/30/20 qoidasi) bog‘liq.',
        stepByStepSolutions: [
          '50/30/20 qoidasini joriy qiling: 50% zaruriy ehtiyojlar, 30% xohishlar, 20% jamg‘arma.',
          'Har bir xaridni kamida 24 soat kutib amalga oshirish odatini shakllantiring.',
          'HELP HUB Byudjet Kalkulyatori orqali oylik xarajatlaringizni hisoblab chiqing.'
        ],
        relatedTools: ['budget_calculator', 'savings_calculator', 'percentage_calculator', 'currency_converter'],
        relatedArticles: ['50/30/20 Byudjet tizimi', 'Pulni to‘g‘ri tejashning 10 ta oson yo‘li'],
        recommendedNextActions: ['Byudjet kalkulyatorida hisob-kitob qilish', 'Jamg‘arma maqsadini belgilash']
      };
    } else {
      return {
        category: '💰 Money & Finance',
        possibleCauses: [
          'Lack of conscious spending tracking and budgeting',
          'Unstructured emergency funds and savings allocation'
        ],
        simpleExplanation: 'Financial stability is achieved through systematic allocation rules such as the 50/30/20 framework.',
        stepByStepSolutions: [
          'Categorize income: 50% needs, 30% discretionary wants, 20% savings & investments.',
          'Calculate total monthly burn rate using the HELP HUB Budget Calculator.',
          'Automate savings immediately after payday.'
        ],
        relatedTools: ['budget_calculator', 'savings_calculator', 'currency_converter'],
        relatedArticles: ['The 50/30/20 Budgeting Rule', 'How to Build an Emergency Fund'],
        recommendedNextActions: ['Open Budget Calculator', 'Set up savings timeline']
      };
    }
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
    recommendedNextActions: [
      language === 'uz' ? 'Tegishli vositani tanlash' : 'Open matching tool',
      language === 'uz' ? 'Dashboardda vazifa sifatida saqlash' : 'Save to Dashboard'
    ]
  };
}

// Problem diagnostic endpoint
app.post('/api/gemini/diagnose', async (req, res) => {
  const { problem, language = 'uz' } = req.body;
  if (!problem || typeof problem !== 'string') {
    return res.status(400).json({ error: 'Problem description is required' });
  }

  // If Gemini API is available, ask Gemini to analyze
  if (aiClient) {
    try {
      const prompt = `You are HELP HUB's Intelligent Diagnostic Engine.
The user describes a problem in language "${language}":
"${problem}"

Analyze this problem and respond ONLY in valid JSON matching this exact schema:
{
  "category": "short category with emoji, e.g. 💻 Kompyuter, 🗣️ Ingliz tili, 💰 Moliya, 🍳 Retseptlar, 🌦️ Ob-havo, 🚗 Avtomobil, 📚 Ta'lim",
  "possibleCauses": ["cause 1", "cause 2", "cause 3"],
  "simpleExplanation": "Clear, friendly explanation in 1-2 sentences in ${language}",
  "stepByStepSolutions": ["step 1", "step 2", "step 3", "step 4"],
  "relatedTools": ["tool_id1", "tool_id2"], // pick from: percentage_calculator, currency_converter, unit_converter, length_converter, weight_converter, time_calculator, date_calculator, age_calculator, bmi_calculator, word_counter, file_size_converter, color_picker, password_checker, budget_calculator, savings_calculator, study_timer, countdown_timer, recipe_finder
  "relatedArticles": ["article title 1", "article title 2"],
  "recommendedNextActions": ["action 1", "action 2"]
}
Keep language matching "${language}". Always ensure JSON is valid without markdown backticks.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } catch (parseErr) {
        console.warn('Gemini response could not be parsed as JSON, falling back:', text);
      }
    } catch (apiErr) {
      console.warn('Gemini API call failed, using intelligent fallback:', apiErr);
    }
  }

  // Fallback to high-quality internal engine
  const fallbackResult = generateSmartFallback(problem, language);
  return res.json(fallbackResult);
});

// AI Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  const { message, category = 'General', language = 'uz', history = [] } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (aiClient) {
    try {
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

      return res.json({
        reply: response.text || '',
        suggestedNextSteps: [
          language === 'uz' ? 'Bu bo‘yicha qo‘shimcha ma\'lumot' : 'More details on this',
          language === 'uz' ? 'Amaliy qadamlar rejasi' : 'Practical action plan',
          language === 'uz' ? 'Tegishli vositani ochish' : 'Open related tool'
        ]
      });
    } catch (err) {
      console.warn('Gemini chat error, using smart response:', err);
    }
  }

  // Fallback chat reply
  const fallback = generateSmartFallback(message, language);
  const replyText = language === 'uz'
    ? `**HELP HUB AI Yordamchisi**:\n\n${fallback.simpleExplanation}\n\n**Tavsiya etilgan qadamlar:**\n${fallback.stepByStepSolutions.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n*Kerakli vositalar:* ${fallback.relatedTools.join(', ')}`
    : `**HELP HUB Assistant**:\n\n${fallback.simpleExplanation}\n\n**Recommended Steps:**\n${fallback.stepByStepSolutions.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n*Related tools:* ${fallback.relatedTools.join(', ')}`;

  return res.json({
    reply: replyText,
    suggestedNextSteps: fallback.recommendedNextActions
  });
});

// Mount Vite middleware in development or static dist in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HELP HUB] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[HELP HUB] Failed to start server:', err);
});
