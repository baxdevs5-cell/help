import { CategoryInfo, ToolDefinition, RecipeItem, AchievementBadge } from '../types';

export const TOOLS_LIST: ToolDefinition[] = [
  {
    id: 'percentage_calculator',
    name: 'Percentage Calculator',
    category: 'calculators',
    icon: 'Percent',
    description: 'Calculate percentages, increases, decreases, and fractions instantly.',
    popular: true
  },
  {
    id: 'currency_converter',
    name: 'Currency Converter',
    category: 'converters',
    icon: 'Coins',
    description: 'Convert between USD, EUR, UZS, RUB, TRY, and SAR with real-time rates.',
    popular: true
  },
  {
    id: 'unit_converter',
    name: 'Unit Converter',
    category: 'converters',
    icon: 'Scale',
    description: 'Convert length, weight, speed, temperature, and volume across systems.',
    popular: true
  },
  {
    id: 'length_converter',
    name: 'Length Converter',
    category: 'converters',
    icon: 'Ruler',
    description: 'Convert meters, kilometers, centimeters, inches, feet, yards, and miles.',
  },
  {
    id: 'weight_converter',
    name: 'Weight Converter',
    category: 'converters',
    icon: 'Weight',
    description: 'Convert kilograms, grams, milligrams, pounds, ounces, and metric tons.',
  },
  {
    id: 'time_calculator',
    name: 'Time Calculator',
    category: 'calculators',
    icon: 'Clock',
    description: 'Add or subtract hours, minutes, and calculate duration between timestamps.',
  },
  {
    id: 'date_calculator',
    name: 'Date Calculator',
    category: 'calculators',
    icon: 'Calendar',
    description: 'Calculate days between dates, working days, and future deadlines.',
  },
  {
    id: 'age_calculator',
    name: 'Age Calculator',
    category: 'calculators',
    icon: 'Cake',
    description: 'Find your exact age in years, months, days, hours, and next birthday countdown.',
    popular: true
  },
  {
    id: 'bmi_calculator',
    name: 'BMI Calculator',
    category: 'lifestyle',
    icon: 'Activity',
    description: 'Calculate Body Mass Index, health category, and healthy weight range.',
    popular: true
  },
  {
    id: 'word_counter',
    name: 'Word & Character Counter',
    category: 'productivity',
    icon: 'FileText',
    description: 'Analyze text statistics, word count, character count, and estimated reading time.',
    popular: true
  },
  {
    id: 'file_size_converter',
    name: 'File Size Converter',
    category: 'converters',
    icon: 'HardDrive',
    description: 'Convert Bytes, KB, MB, GB, and TB accurately in binary and decimal.',
  },
  {
    id: 'color_picker',
    name: 'Color Picker & Palette',
    category: 'developer',
    icon: 'Palette',
    description: 'Inspect HEX, RGB, HSL colors and generate matching harmonic palettes.',
  },
  {
    id: 'password_checker',
    name: 'Password Strength & Generator',
    category: 'productivity',
    icon: 'ShieldCheck',
    description: 'Evaluate password entropy, cracking time, and generate unbreakable passkeys.',
    popular: true
  },
  {
    id: 'budget_calculator',
    name: 'Simple Budget Calculator',
    category: 'calculators',
    icon: 'Wallet',
    description: 'Plan income, track expenses by categories, and enforce the 50/30/20 rule.',
    popular: true
  },
  {
    id: 'savings_calculator',
    name: 'Savings Goal Calculator',
    category: 'calculators',
    icon: 'PiggyBank',
    description: 'Calculate target timeline, necessary monthly deposits, and milestones.',
  },
  {
    id: 'study_timer',
    name: 'Study Pomodoro Timer',
    category: 'productivity',
    icon: 'Timer',
    description: '25-minute focus intervals and 5-minute restorative breaks to maximize learning.',
    popular: true
  },
  {
    id: 'countdown_timer',
    name: 'Countdown Timer',
    category: 'productivity',
    icon: 'Hourglass',
    description: 'Track countdown to exams, trips, project launches, or personal milestones.',
  },
  {
    id: 'recipe_finder',
    name: 'Smart Recipe Finder',
    category: 'lifestyle',
    icon: 'UtensilsCrossed',
    description: 'Select ingredients in your fridge to discover instant delicious recipes.',
    popular: true
  }
];

export const CATEGORIES_LIST: CategoryInfo[] = [
  {
    id: 'tech',
    title: 'Tech & Devices',
    icon: 'Smartphone',
    color: 'from-blue-500 to-indigo-600',
    description: 'Phone, electronics, devices, troubleshooting, Arduino, and basic technology help.',
    topicsCount: 42,
    toolsCount: 6,
    popularTopics: ['Smartphone battery health', 'Fix Wi-Fi drops', 'Arduino beginner circuits', 'Bluetooth pairing']
  },
  {
    id: 'learning',
    title: 'Learning & Study',
    icon: 'GraduationCap',
    color: 'from-amber-500 to-orange-600',
    description: 'Math, English, science, history, tests, explanations, homework support, and study tools.',
    topicsCount: 78,
    toolsCount: 5,
    popularTopics: ['Math formula sheets', 'Effective memorization', 'Active recall framework', 'Exam prep checklist']
  },
  {
    id: 'money',
    title: 'Money & Finance',
    icon: 'DollarSign',
    color: 'from-emerald-500 to-teal-600',
    description: 'Budget calculator, expenses, savings planner, percentage calculator, and financial tools.',
    topicsCount: 35,
    toolsCount: 4,
    popularTopics: ['50/30/20 budgeting rule', 'Emergency fund sizing', 'Compound interest magic', 'Smart currency exchange']
  },
  {
    id: 'weather',
    title: 'Weather & Climate',
    icon: 'CloudSun',
    color: 'from-sky-500 to-blue-600',
    description: 'Current weather, forecasts, temperature, rain radar, and weather-related tools.',
    topicsCount: 15,
    toolsCount: 2,
    popularTopics: ['Precipitation radar', 'UV index safety', 'Humidity comfort scale', 'Wind speed guide']
  },
  {
    id: 'gaming',
    title: 'Gaming & PC Specs',
    icon: 'Gamepad2',
    color: 'from-purple-500 to-pink-600',
    description: 'Gaming guides, game requirements, settings, FPS boosting, and PC hardware compatibility.',
    topicsCount: 50,
    toolsCount: 3,
    popularTopics: ['Check PC Game requirements', 'Boost FPS in Windows', 'Optimal monitor refresh rate', 'Low input lag tips']
  },
  {
    id: 'computer',
    title: 'Computer & Hardware',
    icon: 'Cpu',
    color: 'from-cyan-500 to-blue-600',
    description: 'PC specifications, RAM, SSD, GPU, CPU, troubleshooting, and upgrade guides.',
    topicsCount: 64,
    toolsCount: 4,
    popularTopics: ['Fix slow laptop in 10 mins', 'RAM vs SSD upgrade priority', 'Thermal paste replacement', 'Clean Windows bloatware']
  },
  {
    id: 'recipes',
    title: 'Recipe & Kitchen',
    icon: 'Utensils',
    color: 'from-rose-500 to-red-600',
    description: 'Enter pantry ingredients and find fast, nutritious, and delicious recipes.',
    topicsCount: 90,
    toolsCount: 3,
    popularTopics: ['Egg + Potato fast dishes', '15-minute healthy meals', 'Proper ingredient substitutes', 'Kitchen measurement conversions']
  },
  {
    id: 'planner',
    title: 'Planner & Routine',
    icon: 'CalendarCheck',
    color: 'from-violet-500 to-purple-600',
    description: 'Daily planner, weekly planner, tasks, reminders, and productivity tracking.',
    topicsCount: 30,
    toolsCount: 3,
    popularTopics: ['Time-blocking system', 'Eisenhower urgent/important matrix', 'Morning routine design', 'Overcoming procrastination']
  },
  {
    id: 'english',
    title: 'English Learning',
    icon: 'Languages',
    color: 'from-indigo-500 to-cyan-600',
    description: 'Vocabulary cards, essential grammar rules, sentence practice, and fluency secrets.',
    topicsCount: 85,
    toolsCount: 4,
    popularTopics: ['Top 500 essential words', 'Overcome speaking anxiety', 'Shadowing speaking technique', 'Prepositions made simple']
  },
  {
    id: 'cars',
    title: 'Automotive & Cars',
    icon: 'Car',
    color: 'from-slate-600 to-slate-800',
    description: 'Car maintenance guide, fuel economy calculator, symptom checker, and troubleshooting.',
    topicsCount: 40,
    toolsCount: 3,
    popularTopics: ['Engine sound diagnostics', 'Tire pressure check', 'Improve fuel economy 20%', 'Essential fluids schedule']
  },
  {
    id: 'health',
    title: 'Healthy Lifestyle',
    icon: 'HeartPulse',
    color: 'from-teal-500 to-emerald-600',
    description: 'Daily hydration tracker, sleep science, basic bodyweight routines, and wellness.',
    topicsCount: 45,
    toolsCount: 3,
    popularTopics: ['Hydration calculation', 'Sleep cycle rhythm', '10,000 steps habit', 'Desk posture stretches']
  },
  {
    id: 'travel',
    title: 'Travel & Packing',
    icon: 'Plane',
    color: 'from-amber-500 to-yellow-600',
    description: 'Packing checklist generator, trip budget planner, and international travel tips.',
    topicsCount: 28,
    toolsCount: 2,
    popularTopics: ['Minimalist carry-on checklist', 'Flight comparison hacks', 'Currency exchange safety', 'Offline map essentials']
  },
  {
    id: 'docs',
    title: 'Documents & CV',
    icon: 'Briefcase',
    color: 'from-blue-600 to-slate-700',
    description: 'Modern resume builders, job application templates, and official email etiquette.',
    topicsCount: 32,
    toolsCount: 2,
    popularTopics: ['ATS-friendly resume guide', 'Cover letter formula', 'LinkedIn profile checklist', 'Contract review tips']
  },
  {
    id: 'safety',
    title: 'Digital Safety',
    icon: 'Lock',
    color: 'from-red-500 to-rose-700',
    description: 'Password security, two-factor authentication, phishing defense, and privacy.',
    topicsCount: 38,
    toolsCount: 3,
    popularTopics: ['Spotting phishing emails', 'Setting up 2FA correctly', 'Securing home Wi-Fi', 'Password manager comparison']
  }
];

export const RECIPES_DATA: RecipeItem[] = [
  {
    id: 'rec_1',
    title: 'Classic Spanish Tortilla (Omelet)',
    prepTime: '20 mins',
    calories: '320 kcal',
    ingredients: ['egg', 'potato', 'onion', 'oil', 'salt'],
    instructions: [
      'Peel and slice potatoes into thin 3mm rounds.',
      'Heat 2 tbsp oil in a non-stick skillet over medium-low heat; fry potatoes and chopped onion until tender (about 10 mins).',
      'Whisk eggs in a bowl with a pinch of salt and black pepper.',
      'Fold the warm potatoes into the whisked eggs and let sit for 2 minutes.',
      'Pour mixture back into skillet, cook on low heat for 5 minutes until bottom is golden.',
      'Flip with a plate and cook reverse side for 3 minutes. Serve warm or room temperature.'
    ],
    image: '🍳',
    tag: 'Quick & Hearty'
  },
  {
    id: 'rec_2',
    title: 'Crispy Potato Draniki (Pancakes)',
    prepTime: '15 mins',
    calories: '280 kcal',
    ingredients: ['potato', 'egg', 'flour', 'onion', 'salt'],
    instructions: [
      'Grate peeled potatoes and finely grate half an onion.',
      'Squeeze out excess liquid from the grated potato using a clean kitchen towel.',
      'Add 1 egg, 1 tablespoon of flour, salt, and pepper; mix thoroughly.',
      'Heat oil in a frying pan and spoon the mixture into round flat patties.',
      'Fry for 3-4 minutes on each side until crisp and golden brown.',
      'Serve with sour cream or plain yogurt.'
    ],
    image: '🥞',
    tag: 'Crispy Snack'
  },
  {
    id: 'rec_3',
    title: 'Farmhouse Potato & Egg Stir-Fry',
    prepTime: '15 mins',
    calories: '340 kcal',
    ingredients: ['potato', 'egg', 'tomato', 'oil', 'salt'],
    instructions: [
      'Cut potatoes into 1cm cubes and fry in vegetable oil on medium heat until golden and soft.',
      'Add diced tomato and saute for 2 minutes until juices release.',
      'Create 2 small wells in the pan and crack eggs directly into them.',
      'Cover with a lid for 3 minutes until egg whites set but yolks stay soft.',
      'Garnish with fresh green herbs and serve immediately.'
    ],
    image: '🥘',
    tag: 'Comfort Food'
  },
  {
    id: 'rec_4',
    title: 'Mediterranean Tomato Herb Omelet',
    prepTime: '10 mins',
    calories: '220 kcal',
    ingredients: ['egg', 'tomato', 'cheese', 'oil', 'salt'],
    instructions: [
      'Beat 2 eggs with a pinch of salt and herbs in a bowl.',
      'Lightly sear diced tomatoes in olive oil for 1 minute.',
      'Pour beaten eggs over tomatoes and gently swirl the pan.',
      'Sprinkle shredded cheese over one half as the eggs set.',
      'Fold omelet in half and slide onto a plate. Enjoy hot!'
    ],
    image: '🍅',
    tag: 'High Protein'
  },
  {
    id: 'rec_5',
    title: 'Golden Cheesy Mashed Potato Balls',
    prepTime: '25 mins',
    calories: '310 kcal',
    ingredients: ['potato', 'cheese', 'egg', 'flour'],
    instructions: [
      'Boil potatoes and mash smoothly with salt and butter.',
      'Shape into small balls with a cube of cheese tucked inside.',
      'Roll each ball in flour, dip in beaten egg, and roll in breadcrumbs or flour again.',
      'Pan-fry in oil until evenly golden and crisp on all sides.'
    ],
    image: '🥔',
    tag: 'Cheesy Delight'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'first_step',
    title: 'First Step',
    icon: 'Footprints',
    description: 'Used your first HELP HUB tool or solved a problem.',
    unlocked: true,
    unlockedAt: '2026-09-27'
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    icon: 'BookOpen',
    description: 'Completed 5 learning guides or quizzes.',
    unlocked: false,
    requiredXp: 50
  },
  {
    id: 'problem_solver',
    title: 'Problem Solver',
    icon: 'Wrench',
    description: 'Successfully diagnosed and solved 3 technical or daily issues.',
    unlocked: false,
    requiredXp: 100
  },
  {
    id: 'streak_7',
    title: '7-Day Streak',
    icon: 'Flame',
    description: 'Used HELP HUB for 7 consecutive days.',
    unlocked: false,
    requiredXp: 150
  },
  {
    id: 'helphub_master',
    title: 'HELP HUB Master',
    icon: 'Crown',
    description: 'Reached Level 5 and mastered all core toolkit categories.',
    unlocked: false,
    requiredXp: 300
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task_1',
    title: 'Review 10 new English vocabulary words with flashcards',
    category: '🗣️ English',
    completed: true,
    priority: 'high' as const,
    xpReward: 10
  },
  {
    id: 'task_2',
    title: 'Complete 25-minute Pomodoro study focus session',
    category: '🧠 Study',
    completed: true,
    priority: 'high' as const,
    xpReward: 10
  },
  {
    id: 'task_3',
    title: 'Calculate monthly savings goal for upcoming trip',
    category: '💰 Money',
    completed: true,
    priority: 'medium' as const,
    xpReward: 5
  },
  {
    id: 'task_4',
    title: 'Drink 2.5L daily hydration target (Healthy Habits)',
    category: '🩹 Health',
    completed: true,
    priority: 'low' as const,
    xpReward: 5
  },
  {
    id: 'task_5',
    title: 'Clean Windows temporary files (cleanmgr) to speed up laptop',
    category: '💻 Computer',
    completed: false,
    priority: 'medium' as const,
    xpReward: 5
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Welcome to HELP HUB!',
    message: 'Your all-in-one digital assistant is ready. Ask any problem or explore 17+ interactive tools.',
    time: 'Just now',
    read: false,
    type: 'system' as const
  },
  {
    id: 'notif_2',
    title: 'Streak Active 🔥',
    message: 'You have started your learning streak! Keep practicing daily to earn bonus XP.',
    time: '1 hour ago',
    read: false,
    type: 'streak' as const
  },
  {
    id: 'notif_3',
    title: 'New Tool Added',
    message: 'Try the Smart Recipe Finder — select what is in your fridge and get fast meals.',
    time: 'Yesterday',
    read: true,
    type: 'tool' as const
  }
];

export const ENGLISH_VOCABULARY = [
  { word: 'Resilient', translation: 'Chidamli, egilmas', example: 'She proved to be resilient during difficult challenges.', level: 'B2' },
  { word: 'Eloquent', translation: 'Fasahatli, notiq', example: 'His eloquent speech inspired the entire audience.', level: 'C1' },
  { word: 'Pragmatic', translation: 'Amaliy, amaliyotga asoslangan', example: 'We need a pragmatic approach to solve this deadline.', level: 'B2' },
  { word: 'Ubiquitous', translation: 'Hamma joyda uchraydigan', example: 'Smartphones have become ubiquitous in modern society.', level: 'C1' },
  { word: 'Meticulous', translation: 'O‘ta ehtiyotkor, sinchkov', example: 'He did meticulous research before writing the report.', level: 'B2' },
  { word: 'Innovate', translation: 'Yangilik kiritmoq', example: 'Companies must innovate to remain competitive.', level: 'B1' }
];

export const CAR_SYMPTOMS = [
  {
    symptom: 'Squeaking / Grinding when braking',
    cause: 'Worn brake pads or warped rotors',
    action: 'Inspect brake pad thickness immediately (<3mm requires replacement)',
    urgency: 'High'
  },
  {
    symptom: 'Engine overheating (temperature needle in red)',
    cause: 'Low coolant level, stuck thermostat, or failed radiator fan',
    action: 'Pull over safely, turn off engine, wait 20 mins before inspecting coolant reservoir',
    urgency: 'Critical'
  },
  {
    symptom: 'Car pulls to one side while driving',
    cause: 'Uneven tire pressure or misaligned wheel geometry',
    action: 'Check tire pressures to match door jamb placard (usually 32-35 PSI)',
    urgency: 'Medium'
  },
  {
    symptom: 'Clicking noise when turning key (engine won\'t crank)',
    cause: 'Dead battery or corroded battery terminals',
    action: 'Jump-start using jumper cables or clean corrosion with baking soda/water',
    urgency: 'High'
  }
];
