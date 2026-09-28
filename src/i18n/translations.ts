import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  subTagline: string;
  nav: {
    home: string;
    categories: string;
    tools: string;
    aiHelp: string;
    dashboard: string;
    settings: string;
    search: string;
    language: string;
    theme: string;
    notifications: string;
    profile: string;
    login: string;
  };
  hero: {
    title: string;
    subheading: string;
    searchPlaceholder: string;
    findHelpBtn: string;
    aiAssistantBtn: string;
    tryAsking: string;
    examples: {
      laptop: string;
      weather: string;
      convert: string;
      exam: string;
      cooking: string;
    };
  };
  smartHelp: {
    title: string;
    subtitle: string;
    analyzing: string;
    flowTitle: string;
    problem: string;
    category: string;
    causes: string;
    explanation: string;
    solutions: string;
    recommendedTools: string;
    relatedArticles: string;
    nextActions: string;
    openTool: string;
    addToDashboard: string;
    addedToDashboard: string;
  };
  howItWorks: {
    badge: string;
    heading: string;
    subheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  categories: {
    title: string;
    subtitle: string;
    viewAll: string;
    explore: string;
    tech: string;
    techDesc: string;
    learning: string;
    learningDesc: string;
    money: string;
    moneyDesc: string;
    weather: string;
    weatherDesc: string;
    gaming: string;
    gamingDesc: string;
    computer: string;
    computerDesc: string;
    recipes: string;
    recipesDesc: string;
    planner: string;
    plannerDesc: string;
    english: string;
    englishDesc: string;
    cars: string;
    carsDesc: string;
    health: string;
    healthDesc: string;
    travel: string;
    travelDesc: string;
    docs: string;
    docsDesc: string;
    shopping: string;
    shoppingDesc: string;
    safety: string;
    safetyDesc: string;
  };
  tools: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterCalculators: string;
    filterConverters: string;
    filterProductivity: string;
    filterLifestyle: string;
    openTool: string;
    calculate: string;
    result: string;
    copy: string;
    copied: string;
    reset: string;
  };
  dashboard: {
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
    todayProgress: string;
    tasksTitle: string;
    addTaskPlaceholder: string;
    addTaskBtn: string;
    noTasks: string;
    favoritesTitle: string;
    noFavorites: string;
    streakTitle: string;
    recentToolsTitle: string;
    recentSearchesTitle: string;
    statsCompleted: string;
    statsStreak: string;
    statsTools: string;
    statsXp: string;
    level: string;
    xpToNext: string;
    badgesTitle: string;
  };
  ai: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    send: string;
    thinking: string;
    suggestedPrompts: string[];
    disclaimer: string;
  };
  settings: {
    title: string;
    subtitle: string;
    appearance: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    language: string;
    notifications: string;
    enableNotifs: string;
    soundAlerts: string;
    privacy: string;
    account: string;
    exportData: string;
    resetData: string;
    resetConfirm: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    legal: string;
    privacy: string;
    terms: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  uz: {
    appName: "HELP HUB",
    tagline: "Odamlarga kerakli yordam, bir joyda.",
    subTagline: "Sizga kerak bo‘lgan yordam — bir joyda.",
    nav: {
      home: "Asosiy",
      categories: "Kategoriyalar",
      tools: "Vositalar",
      aiHelp: "AI Yordam",
      dashboard: "Mening Dashboardim",
      settings: "Sozlamalar",
      search: "Qidirish (Ctrl+K)",
      language: "Til",
      theme: "Mavzu",
      notifications: "Bildirishnomalar",
      profile: "Profil",
      login: "Kirish",
    },
    hero: {
      title: "Sizga kerak bo‘lgan yordam — bir joyda.",
      subheading: "Kundalik muammolarni hal qilish, yangi narsalarni o‘rganish, foydali hisob-kitoblar va qulay rejalashtirish uchun yagona raqamli platforma.",
      searchPlaceholder: "Sizga nima kerak? Muammoingizni yozing...",
      findHelpBtn: "Yordam topish",
      aiAssistantBtn: "AI yordamchi",
      tryAsking: "Masalan:",
      examples: {
        laptop: "Laptopim sekin ishlayapti",
        weather: "Bugun yomg‘ir yog‘adimi?",
        convert: "5 kg necha gramm?",
        exam: "Imtihonga qanday tayyorlansam bo‘ladi?",
        cooking: "Uyda tuxum va kartoshka bor, nima pishirsam bo‘ladi?",
      },
    },
    smartHelp: {
      title: "Aqlli Yordam Tizimi",
      subtitle: "Muammoingizni tabiiy tilda yozing — tizim tahlil qiladi, sabablarni ko‘rsatadi va amaliy yechim taqdim etadi.",
      analyzing: "Muammo tahlil qilinmoqda...",
      flowTitle: "Yechim Jarayoni: Muammo → Kategoriya → Yechim → Foydali Vositalar",
      problem: "Kiritilgan muammo",
      category: "Aniqlangan Kategoriya",
      causes: "Ehtimoliy sabablar",
      explanation: "Oddiy tushuntirish",
      solutions: "Bosqichma-bosqich yechim",
      recommendedTools: "Tegishli vositalar",
      relatedArticles: "Foydali maqolalar",
      nextActions: "Tavsiya etilgan keyingi harakatlar",
      openTool: "Vositani ochish",
      addToDashboard: "Dashboardga qo‘shish",
      addedToDashboard: "Dashboardga qo‘shildi! (+5 XP)",
    },
    howItWorks: {
      badge: "Oddiy va samarali",
      heading: "HELP HUB qanday ishlaydi?",
      subheading: "Murakkab qidiruvlarga vaqt sarflamang — 3 qadamda muammoyingizga aniq javob toping.",
      step1Title: "1. SO‘RANG",
      step1Desc: "Sizni qiziqtirgan savol yoki kundalik muammoni tabiiy tilda kiriting.",
      step2Title: "2. KASHF ETING",
      step2Desc: "Platforma tegishli kategoriya, hisoblagich yoki qo‘llanmani bir zumda topadi.",
      step3Title: "3. HAL QILING",
      step3Desc: "Tayyor bosqichma-bosqich reja va vositalar yordamida vazifani bajaring.",
    },
    categories: {
      title: "Asosiy Kategoriyalar",
      subtitle: "Barcha sohalar bo‘yicha tartiblangan yordam to‘plamlari",
      viewAll: "Barchasini ko‘rish",
      explore: "O‘rganish",
      tech: "Texnologiya",
      techDesc: "Telefon, gadjetlar, Arduino va muammolarni bartaraf etish.",
      learning: "Ta'lim",
      learningDesc: "Matematika, fanlar, testlar, tushuntirishlar va dars vositalari.",
      money: "Moliya",
      moneyDesc: "Byudjet, jamg‘arma rejasi, xarajatlar va foiz hisoblagichlari.",
      weather: "Ob-havo",
      weatherDesc: "Hozirgi ob-havo, harorat, prognoz va yog‘ingarchilik radari.",
      gaming: "O‘yinlar",
      gamingDesc: "O‘yin qo‘llanmalari, tizim talablari (PC Specs) va maslahatlar.",
      computer: "Kompyuter",
      computerDesc: "RAM, SSD, CPU, sekinlashuvni tuzatish va yangilash tavsiyalari.",
      recipes: "Retseptlar",
      recipesDesc: "Mavjud masalliqlarni tanlang va mos ovqatlarni toping.",
      planner: "Rejalashtiruvchi",
      plannerDesc: "Kunlik va haftalik vazifalar, eslatmalar va unumdorlik nazorati.",
      english: "Ingliz Tili",
      englishDesc: "Lug‘at, grammatika qoidalari, mini-testlar va gap tuzish mashqlari.",
      cars: "Avtomobil",
      carsDesc: "Texnik xizmat, yoqilg‘i sarfi, nosozlik belgilari va diagnostika.",
      health: "Sog‘lom Hayot",
      healthDesc: "Suv me'yori, uyqu gigiyenasi, mashqlar va salomatlik odatlari.",
      travel: "Sayohat",
      travelDesc: "Sayohat sumkasi ro‘yxati, byudjet va marshrut maslahatlari.",
      docs: "Hujjatlar & CV",
      docsDesc: "Rezyume tayyorlash, rasmiy xat namunalari va formatlar.",
      shopping: "Xarid Yordamchisi",
      shoppingDesc: "Chegirmalarni hisoblash, narxlarni solishtirish va tejash.",
      safety: "Raqamli Xavfsizlik",
      safetyDesc: "Murakkab parollar, xavfsizlik tekshiruvi va kiberxavfsizlik.",
    },
    tools: {
      title: "Foydali Vositalar Markazi",
      subtitle: "Kunlik vazifalaringizni tezlashtiruvchi 17+ interaktiv vosita va kalkulyatorlar",
      filterAll: "Barchasi",
      filterCalculators: "Kalkulyatorlar",
      filterConverters: "Konvertorlar",
      filterProductivity: "Unumdorlik",
      filterLifestyle: "Turmush tarzi",
      openTool: "Ishlatish",
      calculate: "Hisoblash",
      result: "Natija",
      copy: "Nusxa olish",
      copied: "Nusxalandi!",
      reset: "Tozalash",
    },
    dashboard: {
      goodMorning: "Xayrli tong",
      goodAfternoon: "Xayrli kun",
      goodEvening: "Xayrli kech",
      todayProgress: "Bugungi unumdorlik",
      tasksTitle: "Bugungi Vazifalar",
      addTaskPlaceholder: "Yangi vazifa qo‘shing...",
      addTaskBtn: "Qo‘shish",
      noTasks: "Hozircha vazifalar yo‘q. Yangi maqsad qo‘shing!",
      favoritesTitle: "Saqlangan Tanlanganlar",
      noFavorites: "Hali sevimli vositalar saqlanmagan. Vositalar ustidagi yulduzchani bosing!",
      streakTitle: "O‘rganish seriyasi",
      recentToolsTitle: "So‘nggi ishlatilgan vositalar",
      recentSearchesTitle: "So‘nggi qidiruvlar",
      statsCompleted: "Bajarilgan vazifalar",
      statsStreak: "Kunlik ketma-ketlik",
      statsTools: "Ishlatilgan vositalar",
      statsXp: "To‘plangan XP",
      level: "Daraja",
      xpToNext: "Keyingi darajagacha",
      badgesTitle: "Yutuqlar va Nishonlar",
    },
    ai: {
      title: "AI Yordam Markazi",
      subtitle: "Qanday savol yoki topshiriq bo‘lmasin, HELP HUB AI doimo yordamga tayyor.",
      inputPlaceholder: "Savolingizni yozing yoki kerakli yordam turini tanlang...",
      send: "Yuborish",
      thinking: "AI javob tayyorlamoqda...",
      suggestedPrompts: [
        "Buni oddiy tilda tushuntirib ber",
        "Menga qadam-baqadam reja tuzib ber",
        "Mening holatimga to‘g‘ri vositani top",
        "Matnni xatolardan tozalab, chiroyli qilib ber"
      ],
      disclaimer: "HELP HUB AI eng zamonaviy Google Gemini modeli asosida ishlaydi.",
    },
    settings: {
      title: "Tizim Sozlamalari",
      subtitle: "Platformani o‘zingizga moslashtiring",
      appearance: "Tashqi ko‘rinish",
      themeLight: "Yorug‘ rejim (Light)",
      themeDark: "Qorong‘i rejim (Dark)",
      themeSystem: "Tizim sozlamasi (System)",
      language: "Interfeys tili",
      notifications: "Bildirishnomalar",
      enableNotifs: "Eslatmalar va bildirishnomalarni yoqish",
      soundAlerts: "Ovozli signallar",
      privacy: "Maxfiylik va Ma'lumotlar",
      account: "Foydalanuvchi hisobi",
      exportData: "Ma'lumotlarni yuklab olish (JSON)",
      resetData: "Barcha ma'lumotlarni tozalash",
      resetConfirm: "Haqiqatan ham barcha ma'lumotlarni o‘chirib tashlamoqchimisiz?",
    },
    footer: {
      about: "HELP HUB — Odamlarga kerakli yordam, bir joyda. Kundalik muammolarni hal qilish, o‘rganish va hisob-kitoblar uchun yagona raqamli platforma.",
      quickLinks: "Tezkor havolalar",
      legal: "Ma'lumot",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
      rights: "Barcha huquqlar himoyalangan.",
    }
  },
  en: {
    appName: "HELP HUB",
    tagline: "Everything you need. One helpful place.",
    subTagline: "Everything you need. One helpful place.",
    nav: {
      home: "Home",
      categories: "Categories",
      tools: "Tools",
      aiHelp: "AI Help",
      dashboard: "My Dashboard",
      settings: "Settings",
      search: "Search (Ctrl+K)",
      language: "Language",
      theme: "Theme",
      notifications: "Notifications",
      profile: "Profile",
      login: "Sign In",
    },
    hero: {
      title: "Everything you need. One helpful place.",
      subheading: "An all-in-one digital assistance platform designed to help people solve everyday problems, learn, calculate, and organize life.",
      searchPlaceholder: "What do you need? Describe your problem...",
      findHelpBtn: "Find Help",
      aiAssistantBtn: "AI Assistant",
      tryAsking: "Try asking:",
      examples: {
        laptop: "My laptop is running very slow",
        weather: "Will it rain today?",
        convert: "How many grams in 5 kg?",
        exam: "How to prepare effectively for an exam?",
        cooking: "I have eggs and potatoes, what can I cook?",
      },
    },
    smartHelp: {
      title: "Smart Help System",
      subtitle: "Type any everyday issue in natural language — the system analyzes causes, steps, and recommends the right tools.",
      analyzing: "Analyzing your issue...",
      flowTitle: "Resolution Path: Problem → Category → Solution → Useful Tools",
      problem: "Reported Problem",
      category: "Identified Category",
      causes: "Probable Causes",
      explanation: "Clear Explanation",
      solutions: "Step-by-Step Solutions",
      recommendedTools: "Related Tools",
      relatedArticles: "Recommended Guides",
      nextActions: "Next Practical Steps",
      openTool: "Open Tool",
      addToDashboard: "Add to Dashboard",
      addedToDashboard: "Saved to Dashboard! (+5 XP)",
    },
    howItWorks: {
      badge: "Simple & Effective",
      heading: "How HELP HUB Works",
      subheading: "Skip confusing search results — get straight to actionable solutions in 3 intuitive steps.",
      step1Title: "1. ASK",
      step1Desc: "Tell HELP HUB what you need or what challenge you are facing.",
      step2Title: "2. DISCOVER",
      step2Desc: "The platform instantly identifies the exact category, calculator, or guide.",
      step3Title: "3. SOLVE",
      step3Desc: "Follow step-by-step instructions and use dedicated interactive tools.",
    },
    categories: {
      title: "Core Categories",
      subtitle: "Comprehensive problem-solving hubs curated for daily life",
      viewAll: "View All",
      explore: "Explore",
      tech: "Tech & Devices",
      techDesc: "Phones, gadgets, Arduino, and quick hardware troubleshooting.",
      learning: "Learning & Education",
      learningDesc: "Math formulas, science concepts, quizzes, and study guidance.",
      money: "Money & Finance",
      moneyDesc: "Budget calculator, savings planner, expense organizer, percentages.",
      weather: "Weather & Forecast",
      weatherDesc: "Live conditions, temperature, 5-day forecasts, and rain tracker.",
      gaming: "Gaming & PC",
      gamingDesc: "Game guides, minimum PC requirements, performance optimization.",
      computer: "Computer & Hardware",
      computerDesc: "RAM, SSD, CPU, cleanup tips, and performance speed-ups.",
      recipes: "Recipes & Cooking",
      recipesDesc: "Select ingredients you have to instantly generate meals.",
      planner: "Planner & Routine",
      plannerDesc: "Daily and weekly checklists, reminders, and productivity tracking.",
      english: "English Learning",
      englishDesc: "Vocabulary flashcards, grammar mini-rules, and speaking tips.",
      cars: "Automotive & Cars",
      carsDesc: "Maintenance checklists, mileage calculator, sound diagnostics.",
      health: "Healthy Lifestyle",
      healthDesc: "Hydration target, sleep hygiene, workouts, and wellness.",
      travel: "Travel & Trips",
      travelDesc: "Packing checklist, trip budget, and itinerary planning.",
      docs: "Documents & CV",
      docsDesc: "Resume outlines, official letter templates, and formatting.",
      shopping: "Shopping Assistant",
      shoppingDesc: "Discount percentages, unit price comparison, smart buys.",
      safety: "Digital Safety",
      safetyDesc: "Strong password generator, security audit, privacy tips.",
    },
    tools: {
      title: "Interactive Tools Center",
      subtitle: "17+ precision calculators and utilities ready for immediate use",
      filterAll: "All Tools",
      filterCalculators: "Calculators",
      filterConverters: "Converters",
      filterProductivity: "Productivity",
      filterLifestyle: "Lifestyle",
      openTool: "Launch Tool",
      calculate: "Calculate",
      result: "Result",
      copy: "Copy Result",
      copied: "Copied!",
      reset: "Reset",
    },
    dashboard: {
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",
      todayProgress: "Today's Progress",
      tasksTitle: "Today's Tasks",
      addTaskPlaceholder: "Add a new task or action item...",
      addTaskBtn: "Add Task",
      noTasks: "No active tasks. Add one or save from Smart Help!",
      favoritesTitle: "Saved Favorites",
      noFavorites: "No favorites saved yet. Click the star icon on any tool or guide!",
      streakTitle: "Learning Streak",
      recentToolsTitle: "Recently Used Tools",
      recentSearchesTitle: "Recent Searches",
      statsCompleted: "Tasks Completed",
      statsStreak: "Daily Streak",
      statsTools: "Tools Used",
      statsXp: "Total XP Earned",
      level: "Level",
      xpToNext: "XP to Next Level",
      badgesTitle: "Achievements & Badges",
    },
    ai: {
      title: "AI Help Center",
      subtitle: "Powered by Gemini to provide intelligent, contextual guidance for any topic.",
      inputPlaceholder: "What can I help you with today? Ask anything...",
      send: "Send",
      thinking: "HELP HUB AI is analyzing...",
      suggestedPrompts: [
        "Explain this simply.",
        "Help me make a plan.",
        "Find the right tool.",
        "Give me step-by-step instructions."
      ],
      disclaimer: "Powered by Google Gemini 3.8. Built for clear, verified productivity.",
    },
    settings: {
      title: "Settings",
      subtitle: "Personalize your HELP HUB experience",
      appearance: "Appearance",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      themeSystem: "System Default",
      language: "Interface Language",
      notifications: "Notifications",
      enableNotifs: "Enable task reminders and alerts",
      soundAlerts: "Sound notifications",
      privacy: "Privacy & Data",
      account: "User Account",
      exportData: "Export My Data (JSON)",
      resetData: "Reset All Local Data",
      resetConfirm: "Are you sure you want to reset all saved tasks, progress, and preferences?",
    },
    footer: {
      about: "HELP HUB is the all-in-one digital assistance platform empowering users to solve everyday challenges with clarity and speed.",
      quickLinks: "Quick Links",
      legal: "Legal & Trust",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    }
  },
  ru: {
    appName: "HELP HUB",
    tagline: "Вся нужная помощь в одном месте.",
    subTagline: "Вся нужная помощь в одном месте.",
    nav: {
      home: "Главная",
      categories: "Категории",
      tools: "Инструменты",
      aiHelp: "ИИ Помощь",
      dashboard: "Мой Дашборд",
      settings: "Настройки",
      search: "Поиск (Ctrl+K)",
      language: "Язык",
      theme: "Тема",
      notifications: "Уведомления",
      profile: "Профиль",
      login: "Войти",
    },
    hero: {
      title: "Всё, что вам нужно — в одном месте.",
      subheading: "Универсальная цифровая платформа для решения ежедневных задач, обучения, полезных расчётов и организации жизни.",
      searchPlaceholder: "Что вас беспокоит? Опишите проблему...",
      findHelpBtn: "Найти решение",
      aiAssistantBtn: "ИИ Помощник",
      tryAsking: "Например:",
      examples: {
        laptop: "Ноутбук сильно тормозит",
        weather: "Будет ли сегодня дождь?",
        convert: "Сколько граммов в 5 кг?",
        exam: "Как эффективно подготовиться к экзамену?",
        cooking: "Есть яйца и картошка, что приготовить?",
      },
    },
    smartHelp: {
      title: "Умная система помощи",
      subtitle: "Опишите проблему своими словами — система определит категорию, причины и пошаговые решения.",
      analyzing: "Анализируем проблему...",
      flowTitle: "Путь решения: Проблема → Категория → Решение → Инструменты",
      problem: "Ваш запрос",
      category: "Определенная категория",
      causes: "Возможные причины",
      explanation: "Простое объяснение",
      solutions: "Пошаговый план",
      recommendedTools: "Полезные инструменты",
      relatedArticles: "Полезные статьи",
      nextActions: "Следующие шаги",
      openTool: "Открыть инструмент",
      addToDashboard: "Добавить в задачи",
      addedToDashboard: "Сохранено в Дашборд! (+5 XP)",
    },
    howItWorks: {
      badge: "Просто и быстро",
      heading: "Как работает HELP HUB",
      subheading: "Без лишних поисков — точные и практичные решения за 3 шага.",
      step1Title: "1. СПРОСИТЕ",
      step1Desc: "Опишите на естественном языке, что вам нужно решить.",
      step2Title: "2. НАЙДИТЕ",
      step2Desc: "Платформа мгновенно подберет нужный калькулятор или инструкцию.",
      step3Title: "3. РЕШИТЕ",
      step3Desc: "Выполните понятные шаги и закройте задачу.",
    },
    categories: {
      title: "Основные категории",
      subtitle: "Структурированные базы знаний для повседневной жизни",
      viewAll: "Смотреть все",
      explore: "Исследовать",
      tech: "Технологии",
      techDesc: "Смартфоны, электроника, Arduino и починка устройств.",
      learning: "Обучение",
      learningDesc: "Математика, науки, тесты, объяснения и конспекты.",
      money: "Финансы",
      moneyDesc: "Калькулятор бюджета, план накоплений и проценты.",
      weather: "Погода",
      weatherDesc: "Текущая погода, температура, прогноз и карта осадков.",
      gaming: "Игры & ПК",
      gamingDesc: "Гайды по играм, проверка характеристик ПК и настройки.",
      computer: "Компьютеры",
      computerDesc: "RAM, SSD, оптимизация скорости и устранение перегрева.",
      recipes: "Рецепты",
      recipesDesc: "Выберите продукты из холодильника и получите рецепты.",
      planner: "Планировщик",
      plannerDesc: "Список задач на день и неделю, трекинг продуктивности.",
      english: "Английский язык",
      englishDesc: "Карточки слов, правила грамматики и тренировка фраз.",
      cars: "Автомобили",
      carsDesc: "Регламент ТО, расход топлива и расшифровка звуков.",
      health: "Здоровье",
      healthDesc: "Норма воды, здоровый сон и простые тренировки.",
      travel: "Путешествия",
      travelDesc: "Чек-лист чемодана, расчет расходов в поездке.",
      docs: "Документы & Резюме",
      docsDesc: "Шаблоны резюме, образцы писем и оформление.",
      shopping: "Покупки",
      shoppingDesc: "Расчет скидок, сравнение цен за килограмм/литр.",
      safety: "Безопасность",
      safetyDesc: "Генератор стойких паролей и цифровая гигиена.",
    },
    tools: {
      title: "Центр Инструментов",
      subtitle: "17+ работающих калькуляторов и утилит для быстрых расчетов",
      filterAll: "Все",
      filterCalculators: "Калькуляторы",
      filterConverters: "Конвертеры",
      filterProductivity: "Продуктивность",
      filterLifestyle: "Образ жизни",
      openTool: "Запустить",
      calculate: "Рассчитать",
      result: "Результат",
      copy: "Скопировать",
      copied: "Скопировано!",
      reset: "Сбросить",
    },
    dashboard: {
      goodMorning: "Доброе утро",
      goodAfternoon: "Добрый день",
      goodEvening: "Добрый вечер",
      todayProgress: "Прогресс дня",
      tasksTitle: "Задачи на сегодня",
      addTaskPlaceholder: "Добавить новую задачу...",
      addTaskBtn: "Добавить",
      noTasks: "Задач пока нет. Добавьте цель или сохраните из рекомендаций!",
      favoritesTitle: "Избранное",
      noFavorites: "Пока нет сохраненных инструментов. Нажмите звездочку!",
      streakTitle: "Серия активности",
      recentToolsTitle: "Недавние инструменты",
      recentSearchesTitle: "История поиска",
      statsCompleted: "Выполнено задач",
      statsStreak: "Дней подряд",
      statsTools: "Использовано утилит",
      statsXp: "Заработано XP",
      level: "Уровень",
      xpToNext: "XP до следующего уровня",
      badgesTitle: "Достижения и Награды",
    },
    ai: {
      title: "Центр ИИ Помощи",
      subtitle: "Умный помощник на базе Gemini ответит на любой вопрос и составит план.",
      inputPlaceholder: "Чем я могу вам помочь сегодня? Задайте вопрос...",
      send: "Отправить",
      thinking: "ИИ анализирует запрос...",
      suggestedPrompts: [
        "Объясни это простыми словами",
        "Составь пошаговый план действий",
        "Подбери нужный инструмент",
        "Проверь текст на ошибки"
      ],
      disclaimer: "Работает на базе новейшей модели Google Gemini 3.8.",
    },
    settings: {
      title: "Настройки",
      subtitle: "Управление внешним видом и параметрами HELP HUB",
      appearance: "Внешний вид",
      themeLight: "Светлая тема",
      themeDark: "Темная тема",
      themeSystem: "Системная тема",
      language: "Язык интерфейса",
      notifications: "Уведомления",
      enableNotifs: "Включить напоминания о задачах",
      soundAlerts: "Звуковые сигналы",
      privacy: "Конфиденциальность и данные",
      account: "Аккаунт пользователя",
      exportData: "Экспорт данных (JSON)",
      resetData: "Сбросить все сохраненные данные",
      resetConfirm: "Вы уверены, что хотите сбросить все сохраненные задачи и XP?",
    },
    footer: {
      about: "HELP HUB — единая платформа цифровой помощи для решения жизненных вопросов и продуктивности.",
      quickLinks: "Быстрые ссылки",
      legal: "Информация",
      privacy: "Конфиденциальность",
      terms: "Условия использования",
      rights: "Все права защищены.",
    }
  },
  tr: {
    appName: "HELP HUB",
    tagline: "İhtiyacınız olan yardım tek yerde.",
    subTagline: "İhtiyacınız olan yardım tek yerde.",
    nav: {
      home: "Ana Sayfa",
      categories: "Kategoriler",
      tools: "Araçlar",
      aiHelp: "Yapay Zeka",
      dashboard: "Panelim",
      settings: "Ayarlar",
      search: "Ara (Ctrl+K)",
      language: "Dil",
      theme: "Tema",
      notifications: "Bildirimler",
      profile: "Profil",
      login: "Giriş Yap",
    },
    hero: {
      title: "İhtiyacınız olan her şey. Tek bir yerde.",
      subheading: "Günlük sorunları çözmek, öğrenmek, hesaplamalar yapmak ve hayatınızı düzenlemek için hepsi bir arada dijital yardım platformu.",
      searchPlaceholder: "Neye ihtiyacınız var? Sorununuzu yazın...",
      findHelpBtn: "Yardım Bul",
      aiAssistantBtn: "Yapay Zeka Asistanı",
      tryAsking: "Örnek sorular:",
      examples: {
        laptop: "Dizüstü bilgisayarım çok yavaş çalışıyor",
        weather: "Bugün yağmur yağacak mı?",
        convert: "5 kg kaç gram eder?",
        exam: "Sınava en verimli nasıl hazırlanırım?",
        cooking: "Evde yumurta ve patates var, ne pişirebilirim?",
      },
    },
    smartHelp: {
      title: "Akıllı Yardım Sistemi",
      subtitle: "Sorununuzu doğal dille yazın; sistem olası nedenleri, çözümleri ve doğru araçları listelesin.",
      analyzing: "Sorununuz analiz ediliyor...",
      flowTitle: "Çözüm Akışı: Sorun → Kategori → Çözüm → Yararlı Araçlar",
      problem: "Bildirilen Sorun",
      category: "Belirlenen Kategori",
      causes: "Olası Nedenler",
      explanation: "Basit Açıklama",
      solutions: "Adım Adım Çözüm",
      recommendedTools: "İlgili Araçlar",
      relatedArticles: "İlgili Rehberler",
      nextActions: "Sonraki Adımlar",
      openTool: "Aracı Aç",
      addToDashboard: "Görevlere Ekle",
      addedToDashboard: "Panele kaydedildi! (+5 XP)",
    },
    howItWorks: {
      badge: "Hızlı & Kolay",
      heading: "HELP HUB Nasıl Çalışır?",
      subheading: "Karışık arama sonuçları arasında kaybolmadan 3 adımda kesin çözüme ulaşın.",
      step1Title: "1. SORUN",
      step1Desc: "İhtiyacınızı veya karşılaştığınız problemi yazın.",
      step2Title: "2. KEŞFEDİN",
      step2Desc: "Platform anında doğru kategori, araç veya kılavuzu bulsun.",
      step3Title: "3. ÇÖZÜN",
      step3Desc: "Adımları takip edin ve görevinizi kolayca tamamlayın.",
    },
    categories: {
      title: "Ana Kategoriler",
      subtitle: "Günlük yaşam için özenle hazırlanmış yardım merkezleri",
      viewAll: "Tümünü Gör",
      explore: "İncele",
      tech: "Teknoloji",
      techDesc: "Telefon, cihazlar, Arduino ve donanım sorun giderme.",
      learning: "Eğitim",
      learningDesc: "Matematik, bilim, sınavlar ve ders araçları.",
      money: "Para & Finans",
      moneyDesc: "Bütçe hesaplayıcı, birikim planı ve yüzde hesaplama.",
      weather: "Hava Durumu",
      weatherDesc: "Anlık hava durumu, sıcaklık, 5 günlük tahmin ve yağış.",
      gaming: "Oyun & PC",
      gamingDesc: "Oyun rehberleri, sistem gereksinimleri ve FPS ayarları.",
      computer: "Bilgisayar",
      computerDesc: "RAM, SSD, işlemci, hızlandırma ve temizlik rehberi.",
      recipes: "Yemek Tarifleri",
      recipesDesc: "Elinizdeki malzemeleri seçin, uygun yemekleri görün.",
      planner: "Planlayıcı",
      plannerDesc: "Günlük ve haftalık yapılacaklar listesi, üretkenlik takibi.",
      english: "İngilizce",
      englishDesc: "Kelime kartları, dilbilgisi kuralları ve konuşma ipuçları.",
      cars: "Otomobil",
      carsDesc: "Bakım takvimi, yakıt tüketimi ve arıza sesleri rehberi.",
      health: "Sağlıklı Yaşam",
      healthDesc: "Su ihtiyacı, uyku düzeni ve pratik egzersizler.",
      travel: "Seyahat",
      travelDesc: "Bavul kontrol listesi, gezi bütçesi ve rota önerileri.",
      docs: "Belgeler & CV",
      docsDesc: "Özgeçmiş hazırlama, dilekçe örnekleri ve formatlar.",
      shopping: "Alışveriş Asistanı",
      shoppingDesc: "İndirim hesaplama, birim fiyat kıyaslama.",
      safety: "Dijital Güvenlik",
      safetyDesc: "Güçlü şifre üretici ve siber güvenlik önerileri.",
    },
    tools: {
      title: "Araçlar Merkezi",
      subtitle: "Günlük işlerinizi kolaylaştıran 17+ etkileşimli hesaplayıcı",
      filterAll: "Tümü",
      filterCalculators: "Hesaplayıcılar",
      filterConverters: "Dönüştürücüler",
      filterProductivity: "Üretkenlik",
      filterLifestyle: "Yaşam",
      openTool: "Kullan",
      calculate: "Hesapla",
      result: "Sonuç",
      copy: "Kopyala",
      copied: "Kopyalandı!",
      reset: "Sıfırla",
    },
    dashboard: {
      goodMorning: "Günaydın",
      goodAfternoon: "Tünaydın",
      goodEvening: "İyi akşamlar",
      todayProgress: "Günün İlerlemesi",
      tasksTitle: "Bugünkü Görevler",
      addTaskPlaceholder: "Yeni görev ekleyin...",
      addTaskBtn: "Ekle",
      noTasks: "Henüz görev yok. Yeni bir hedef ekleyin!",
      favoritesTitle: "Favoriler",
      noFavorites: "Henüz favori araç eklenmedi. Araçlardaki yıldız ikonuna tıklayın!",
      streakTitle: "Öğrenme Serisi",
      recentToolsTitle: "Son Kullanılan Araçlar",
      recentSearchesTitle: "Son Aramalar",
      statsCompleted: "Tamamlanan Görev",
      statsStreak: "Günlük Seri",
      statsTools: "Kullanılan Araç",
      statsXp: "Kazanılan XP",
      level: "Seviye",
      xpToNext: "Sonraki Seviyeye Kalan XP",
      badgesTitle: "Rozetler & Başarılar",
    },
    ai: {
      title: "Yapay Zeka Yardım Merkezi",
      subtitle: "Gemini destekli akıllı asistanınızla her konuyu kolayca çözün.",
      inputPlaceholder: "Size bugün nasıl yardımcı olabilirim? Yazın...",
      send: "Gönder",
      thinking: "Yapay zeka düşünüyor...",
      suggestedPrompts: [
        "Bunu basitçe açıkla.",
        "Bana adım adım bir plan hazırla.",
        "Doğru aracı bulmamda yardım et.",
        "Metni düzelt ve profesyonel hale getir."
      ],
      disclaimer: "Google Gemini 3.8 modeli ile çalışır.",
    },
    settings: {
      title: "Ayarlar",
      subtitle: "HELP HUB deneyiminizi kişiselleştirin",
      appearance: "Görünüm",
      themeLight: "Açık Tema",
      themeDark: "Koyu Tema",
      themeSystem: "Sistem Varsayılanı",
      language: "Arayüz Dili",
      notifications: "Bildirimler",
      enableNotifs: "Görev hatırlatıcılarını etkinleştir",
      soundAlerts: "Sesli uyarılar",
      privacy: "Gizlilik ve Veriler",
      account: "Kullanıcı Hesabı",
      exportData: "Verileri İndir (JSON)",
      resetData: "Tüm Verileri Sıfırla",
      resetConfirm: "Kayıtlı tüm görevleri ve ilerlemenizi silmek istediğinizden emin misiniz?",
    },
    footer: {
      about: "HELP HUB, insanların günlük problemlerini çözmelerine yardımcı olan dijital destek platformudur.",
      quickLinks: "Hızlı Bağlantılar",
      legal: "Yasal Bilgiler",
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Koşulları",
      rights: "Tüm hakları saklıdır.",
    }
  },
  ar: {
    appName: "HELP HUB",
    tagline: "المساعدة التي تحتاجها في مكان واحد.",
    subTagline: "كل ما تحتاجه في مكان واحد مفيد.",
    nav: {
      home: "الرئيسية",
      categories: "الأقسام",
      tools: "الأدوات",
      aiHelp: "مساعد الذكاء الاصطناعي",
      dashboard: "لوحتي",
      settings: "الإعدادات",
      search: "بحث (Ctrl+K)",
      language: "اللغة",
      theme: "المظهر",
      notifications: "الإشعارات",
      profile: "الملف الشخصي",
      login: "تسجيل الدخول",
    },
    hero: {
      title: "كل ما تحتاجه. في مكان واحد مفيد.",
      subheading: "منصة مساعدة رقمية شاملة لحل المشكلات اليومية، والتعلم، والحسابات المفيدة، وتنظيم حياتك اليومية بسهولة.",
      searchPlaceholder: "ما الذي تبحث عنه؟ اكتب مشكلتك هنا...",
      findHelpBtn: "البحث عن حل",
      aiAssistantBtn: "المساعد الذكي",
      tryAsking: "أمثلة شائعة:",
      examples: {
        laptop: "جهاز الكمبيوتر المحمول بطيء للغاية",
        weather: "هل ستمطر اليوم؟",
        convert: "كم غرام في 5 كجم؟",
        exam: "كيف أستعد للامتحان بفاعلية؟",
        cooking: "لدي بيض وبطاطس، ماذا يمكنني أن أطبخ؟",
      },
    },
    smartHelp: {
      title: "نظام المساعدة الذكي",
      subtitle: "اكتب مشكلتك بلغة بسيطة — سيقوم النظام بتحليل الأسباب وتوفير الحلول التفاعلية فوراً.",
      analyzing: "جاري تحليل المشكلة بدقة...",
      flowTitle: "مسار الحل: المشكلة ← القسم ← الحل العملي ← الأدوات المناسبة",
      problem: "المشكلة المدخلة",
      category: "القسم المحدد",
      causes: "الأسباب المحتملة",
      explanation: "شرح مبسط",
      solutions: "خطوات الحل خطوة بخطوة",
      recommendedTools: "أدوات مساعدة",
      relatedArticles: "مقالات ذات صلة",
      nextActions: "الخطوات المقترحة التالية",
      openTool: "فتح الأداة",
      addToDashboard: "إضافة إلى مهامي",
      addedToDashboard: "تمت الإضافة إلى لوحة التحكم! (+5 XP)",
    },
    howItWorks: {
      badge: "سهل وسريع",
      heading: "كيف يعمل HELP HUB؟",
      subheading: "تخلص من نتائج البحث المشتتة — احصل على حلول مباشرة في 3 خطوات بسيطة.",
      step1Title: "1. اسأل",
      step1Desc: "اكتب ما تحتاجه أو المشكلة التي تواجهها بكلماتك الخاصة.",
      step2Title: "2. اكتشف",
      step2Desc: "تحدد المنصة القسم المناسب أو الأداة أو الدليل فوراً.",
      step3Title: "3. أنجز",
      step3Desc: "اتبع الخطوات العملية واستخدم الأدوات التفاعلية لإتمام مهمتك.",
    },
    categories: {
      title: "الأقسام الرئيسية",
      subtitle: "مراكز معرفية منظمة لخدمة احتياجاتك اليومية",
      viewAll: "عرض الكل",
      explore: "استكشف",
      tech: "التكنولوجيا والأجهزة",
      techDesc: "الهواتف، الأجهزة الإلكترونية، والتعامل مع الأعطال التقنية.",
      learning: "التعليم والدراسة",
      learningDesc: "الرياضيات، العلوم، الاختبارات، وحلول المذاكرة.",
      money: "المال والادخار",
      moneyDesc: "حاسبة الميزانية، خطة الادخار، وحساب النسب المالية.",
      weather: "الطقس والمناخ",
      weatherDesc: "حالة الطقس المباشرة، درجات الحرارة، وتوقعات 5 أيام.",
      gaming: "الألعاب والكمبيوتر",
      gamingDesc: "متطلبات تشغيل الألعاب، إعدادات الأداء، ونصائح الألعاب.",
      computer: "صيانة الحاسوب",
      computerDesc: "الذاكرة العشوائية، وسائط التخزين، وتسريع أداء النظام.",
      recipes: "الوصفات والطبخ",
      recipesDesc: "اختر المكونات المتوفرة لديك واكتشف أشهى الوصفات فوراً.",
      planner: "المخطط اليومي",
      plannerDesc: "قوائم المهام، المتابعة الأسبوعية، وزيادة الإنتاجية.",
      english: "تعلم الإنجليزية",
      englishDesc: "بطاقات المفردات، القواعد الأساسية، والتدريب اليومي.",
      cars: "السيارات والصيانة",
      carsDesc: "جدول الصيانة الدورية، استهلاك الوقود، وتشخيص الأعطال.",
      health: "نمط حياة صحي",
      healthDesc: "معدل شرب الماء، تحسين النوم، والتمارين البسيطة.",
      travel: "السفر والرحلات",
      travelDesc: "قائمة حقيبة السفر، ميزانية الرحلة، وملاحظات الوجهة.",
      docs: "المستندات والسيرة",
      docsDesc: "نماذج السيرة الذاتية، صياغة الرسائل الرسمية.",
      shopping: "مساعد التسوق",
      shoppingDesc: "حساب الخصومات، مقارنة الأسعار، والشراء الذكي.",
      safety: "الأمان الرقمي",
      safetyDesc: "توليد كلمات مرور قوية، وفحص الأمان والخصوصية.",
    },
    tools: {
      title: "مركز الأدوات التفاعلية",
      subtitle: "أكثر من 17 أداة وحاسبة فورية لحل احتياجاتك اليومية بدقة",
      filterAll: "الكل",
      filterCalculators: "الحاسبات",
      filterConverters: "المحولات",
      filterProductivity: "الإنتاجية",
      filterLifestyle: "أسلوب الحياة",
      openTool: "تشغيل الأداة",
      calculate: "احسب",
      result: "النتيجة",
      copy: "نسخ النتيجة",
      copied: "تم النسخ!",
      reset: "إعادة ضبط",
    },
    dashboard: {
      goodMorning: "صباح الخير",
      goodAfternoon: "مساء الخير",
      goodEvening: "مساء النور",
      todayProgress: "إنجاز اليوم",
      tasksTitle: "مهام اليوم",
      addTaskPlaceholder: "أضف مهمة جديدة...",
      addTaskBtn: "إضافة",
      noTasks: "لا توجد مهام حالياً. أضف هدفاً جديداً!",
      favoritesTitle: "المفضلة المحفوظة",
      noFavorites: "لم تقم بحفظ أي أدوات بعد. اضغط على رمز النجمة لحفظ أي أداة!",
      streakTitle: "أيام الاستمرارية",
      recentToolsTitle: "الأدوات المستخدمة مؤخراً",
      recentSearchesTitle: "عمليات البحث الأخيرة",
      statsCompleted: "المهام المكتملة",
      statsStreak: "أيام متتالية",
      statsTools: "الأدوات المستعملة",
      statsXp: "نقاط الخبرة (XP)",
      level: "المستوى",
      xpToNext: "نقاط للوصول للمستوى التالي",
      badgesTitle: "الإنجازات والأوسمة",
    },
    ai: {
      title: "مركز المساعدة بالذكاء الاصطناعي",
      subtitle: "مساعدك الذكي المدعوم بنموذج Gemini جاهز لمساعدتك في كل سؤال.",
      inputPlaceholder: "كيف يمكنني مساعدتك اليوم؟ اسأل أي شيء...",
      send: "إرسال",
      thinking: "المساعد يفكر...",
      suggestedPrompts: [
        "اشرح لي هذا بأسلوب مبسط.",
        "ساعدني في وضع خطة عمل منظمة.",
        "اختر الأداة المناسبة لمشكلتي.",
        "راجع النص وحسّن صياغته."
      ],
      disclaimer: "مدعوم بنموذج Google Gemini 3.8 المتقدم لأفضل تجربة إنتاجية.",
    },
    settings: {
      title: "الإعدادات",
      subtitle: "تخصيص تجربة استخدام HELP HUB",
      appearance: "المظهر والألوان",
      themeLight: "الوضع الفاتح",
      themeDark: "الوضع الداكن",
      themeSystem: "تلقائي حسب النظام",
      language: "لغة الواجهة",
      notifications: "الإشعارات والتنبيهات",
      enableNotifs: "تفعيل تنبيهات المهام",
      soundAlerts: "الأصوات التنبيهية",
      privacy: "الخصوصية والبيانات",
      account: "حساب المستخدم",
      exportData: "تصدير بياناتي (JSON)",
      resetData: "إعادة ضبط جميع البيانات",
      resetConfirm: "هل أنت متأكد من رغبتك في حذف جميع المهام والنقاط المحفوظة؟",
    },
    footer: {
      about: "HELP HUB هي منصة المساعدة الرقمية الشاملة لتمكين الأفراد من حل مشكلاتهم اليومية بسرعة ويسر.",
      quickLinks: "روابط سريعة",
      legal: "معلومات قانونية",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      rights: "جميع الحقوق محفوظة.",
    }
  }
};
