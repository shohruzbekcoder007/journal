export const translations = {
  en: {
    navigation: {
      articles: "Articles",
      journals: "Journals",
      authors: "Authors",
      resources: "Resources",
    },
    hero: {
      title: "Advancing Research Through Collaboration",
      description:
        "A comprehensive platform for research teams to publish, collaborate, and advance scientific knowledge. Streamline your publication process with our integrated tools and expert review system.",
      browseButton: "Browse Articles",
      submitButton: "Submit Research",
    },
    features: {
      title: "Publication Features",
      peerReview: {
        title: "Peer Review System",
        description: "Robust double-blind peer review process with expert reviewers across multiple disciplines",
      },
      citation: {
        title: "Citation Management",
        description:
          "Integrated citation tools supporting multiple formats (APA, MLA, Chicago) with automatic formatting",
      },
      analytics: {
        title: "Research Analytics",
        description: "Comprehensive analytics dashboard tracking citations, downloads, and research impact metrics",
      },
    },
    video: {
      title: "Discover Our Journal",
      description:
        "Watch our video to learn more about the journal's mission, impact, and how to contribute your research.",
      videoTitle: "SciPublish Journal Overview",
      caption: "Learn about our peer review process, publication standards, and the benefits of publishing with us.",
    },
    partners: {
      title: "Our Academic Partners",
      description:
        "We collaborate with leading universities and research institutions worldwide to advance scientific knowledge.",
    },
    common: {
      submitPaper: "Submit Paper",
      footer: "© 2024 SciPublish. Advancing scientific knowledge through collaboration.",
      phoneNumber: "+1 (800) 123-4567",
    },
    search: {
      title: "Search",
      placeholder: "Search for articles, journals, authors...",
      button: "Search",
      searching: "Searching...",
      recentSearches: "Recent Searches",
    },
    submit: {
      title: "Submit Your Research Paper",
      description: "Complete the form below to submit your research paper for review and publication.",
      formTitle: "Paper Submission Form",
      formDescription: "Please provide all required information about your paper.",
      titleLabel: "Paper Title",
      titlePlaceholder: "Enter the full title of your paper",
      authorsLabel: "Authors",
      authorsPlaceholder: "Enter author names (separated by commas)",
      authorsHelp: "List all authors in the order they should appear on the publication.",
      abstractLabel: "Abstract",
      abstractPlaceholder: "Provide a brief summary of your research (250-300 words)",
      categoryLabel: "Research Category",
      categoryPlaceholder: "Select a category",
      keywordsLabel: "Keywords",
      keywordsPlaceholder: "Enter keywords (separated by commas)",
      keywordsHelp: "Include 5-8 keywords that best describe your research.",
      fileLabel: "Paper File",
      dropzoneText: "Drag and drop your file here or click to browse",
      fileFormats: "Accepted formats: PDF, DOCX (Max size: 10MB)",
      browseButton: "Browse Files",
      commentsLabel: "Additional Comments",
      commentsPlaceholder: "Any additional information you'd like to share with the editors",
      cancelButton: "Cancel",
      submitButton: "Submit Paper",
      submittingButton: "Submitting...",
      validationError: "Please fill in all required fields",
      fileRequired: "Please upload your paper file",
      successMessage: "Your paper has been successfully submitted!",
      errorMessage: "Failed to submit paper. Please try again.",
      helpText: "Need help with your submission? Contact our editorial team at",
    },
    articles: {
      title: "Scientific Articles",
      search: "Search articles...",
      noResults: "No articles found.",
      columns: {
        title: "Title",
        authors: "Authors",
        category: "Category",
        createdAt: "Published Date",
        file: "File",
      },
    },
    journals: {
      title: "Academic Journals",
      field: "Field",
      frequency: "Publication Frequency",
    },
    authors: {
      title: "Featured Authors",
      field: "Research Field",
      publications: "Publications",
    },
    resources: {
      title: "Research Resources",
      download: "Download",
    },
    admin: {
      dashboard: "Dashboard",
      sidebar: {
        dashboard: "Dashboard",
        articles: "Articles",
        journals: "Journals",
        authors: "Authors",
        resources: "Resources",
        submissions: "Submissions",
      },
      stats: {
        articles: "Total Articles",
        journals: "Total Journals",
        authors: "Total Authors",
        resources: "Total Resources",
      },
      articles: {
        title: "Manage Articles",
        create: "Create Article",
        edit: "Edit",
        delete: "Delete",
        search: "Search articles...",
        noResults: "No articles found.",
        columns: {
          title: "Title",
          authors: "Authors",
          category: "Category",
          status: "Status",
          createdAt: "Created At",
          actions: "Actions",
        },
        create_p: {
          button: "Create Article",
          title: "Create New Article",
          description: "Fill in the details below to create a new article.",
          form: {
            title: "Title",
            titlePlaceholder: "Enter article title",
            abstract: "Abstract",
            abstractPlaceholder: "Enter article abstract",
            authors: "Authors",
            authorsPlaceholder: "Enter author names (comma separated)",
            category: "Category",
            categoryPlaceholder: "Select a category",
            submit: "Create Article",
            file: "file",
            filePlaceholder: "Select a file",
            status: "Status",
            statusPlaceholder: "Select a status",
          },
          success: "Article created successfully",
          error: "Failed to create article",
        },
      },
      resources: {
        title: "Manage Resources",
        create: "Create Resource",
        edit: "Edit",
        delete: "Delete",
        search: "Search resources...",
        noResults: "No resources found.",
        columns: {
          title: "Title",
          type: "Type",
          category: "Category",
          downloads: "Downloads",
          status: "Status",
          createdAt: "Created At",
          actions: "Actions",
        },
      },
      journals: {
        title: "Manage Journals",
        create: "Create Journal",
        edit: "Edit",
        delete: "Delete",
        search: "Search journals...",
        noResults: "No journals found.",
        see: "See",
        columns: {
          title: "Title",
          field: "Field",
          issn: "ISSN",
          frequency: "Frequency",
          status: "Status",
          createdAt: "Created At",
          actions: "Actions",
          year: "Year",
        },
      },
      submissions: {
        title: "Manage Submissions",
        viewTitle: "Submission Details",
        back: "Back",
        view: "View",
        download: "Download",
        approve: "Approve",
        reject: "Reject",
        resetStatus: "Reset to Pending",
        statusActive: "Approved",
        statusInactive: "Rejected",
        statusPending: "Pending",
        submittedOn: "Submitted on",
        authors: "Authors",
        category: "Category",
        keywords: "Keywords",
        abstract: "Abstract",
        comments: "Additional Comments",
        file: "Paper File",
        tableCaption: "List of all submitted papers",
        noResults: "No submissions found.",
        columns: {
          title: "Title",
          authors: "Authors",
          category: "Category",
          status: "Status",
          createdAt: "Submitted Date",
          actions: "Actions",
        },
      },
      authors: {
        title: "Manage Authors",
        create: "Create Author",
        edit: "Edit",
        delete: "Delete",
        search: "Search authors...",
        noResults: "No authors found.",
        cancel: "Cancel",
        updating: "Updating...",
        updateSuccess: "Author updated successfully",
        updateError: "Failed to update author",
        columns: {
          name: "Name",
          institution: "Institution",
          field: "Field",
          publications: "Publications",
          status: "Status",
          createdAt: "Created At",
          actions: "Actions",
        },
      },
      login: {
        title: "Admin Login",
        description: "Enter your credentials to access the admin panel",
        emailLabel: "Email",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        rememberMe: "Remember me",
        loginButton: "Sign in",
        invalidCredentials: "Invalid email or password",
      },
    },
  },
  ru: {
    navigation: {
      articles: "Статьи",
      journals: "Журналы",
      authors: "Авторы",
      resources: "Ресурсы",
    },
    hero: {
      title: "Развитие исследований через сотрудничество",
      description:
        "Комплексная платформа для исследовательских групп для публикации, сотрудничества и развития научных знаний. Оптимизируйте процесс публикации с помощью наших интегрированных инструментов и системы экспертной оценки.",
      browseButton: "Просмотр статей",
      submitButton: "Отправить исследование",
    },
    features: {
      title: "Особенности публикации",
      peerReview: {
        title: "Система рецензирования",
        description: "Надежный процесс двойного слепого рецензирования с экспертами из разных дисциплин",
      },
      citation: {
        title: "Управление цитированием",
        description: "Интегрированные инструменты цитирования с поддержкой различных форматов (APA, MLA, Chicago)",
      },
      analytics: {
        title: "Аналитика исследований",
        description:
          "Комплексная панель аналитики для отслеживания цитирований, загрузок и метрик влияния исследований",
      },
    },
    video: {
      title: "Узнайте о нашем журнале",
      description:
        "Посмотрите наше видео, чтобы узнать больше о миссии журнала, его влиянии и о том, как внести свой вклад в исследования.",
      videoTitle: "Обзор журнала SciPublish",
      caption: "Узнайте о нашем процессе рецензирования, стандартах публикации и преимуществах публикации у нас.",
    },
    partners: {
      title: "Наши академические партнеры",
      description:
        "Мы сотрудничаем с ведущими университетами и исследовательскими учреждениями по всему миру для развития научных знаний.",
    },
    common: {
      submitPaper: "Отправить статью",
      footer: "© 2024 SciPublish. Развитие научных знаний через сотрудничество.",
      phoneNumber: "+7 (800) 123-45-67",
    },
    search: {
      title: "Поиск",
      placeholder: "Поиск статей, журналов, авторов...",
      button: "Поиск",
      searching: "Поиск...",
      recentSearches: "Недавние поисковые запросы",
    },
    submit: {
      title: "Отправить научную статью",
      description: "Заполните форму ниже, чтобы отправить вашу научную статью на рецензирование и публикацию.",
      formTitle: "Форма подачи статьи",
      formDescription: "Пожалуйста, предоставьте всю необходимую информацию о вашей статье.",
      titleLabel: "Название статьи",
      titlePlaceholder: "Введите полное название вашей статьи",
      authorsLabel: "Авторы",
      authorsPlaceholder: "Введите имена авторов (через запятую)",
      authorsHelp: "Перечислите всех авторов в том порядке, в котором они должны появиться в публикации.",
      abstractLabel: "Аннотация",
      abstractPlaceholder: "Предоставьте краткое резюме вашего исследования (250-300 слов)",
      categoryLabel: "Категория исследования",
      categoryPlaceholder: "Выберите категорию",
      keywordsLabel: "Ключевые слова",
      keywordsPlaceholder: "Введите ключевые слова (через запятую)",
      keywordsHelp: "Включите 5-8 ключевых слов, которые лучше всего описывают ваше исследование.",
      fileLabel: "Файл статьи",
      dropzoneText: "Перетащите файл сюда или нажмите для выбора",
      fileFormats: "Принимаемые форматы: PDF, DOCX (Макс. размер: 10МБ)",
      browseButton: "Выбрать файлы",
      commentsLabel: "Дополнительные комментарии",
      commentsPlaceholder: "Любая дополнительная информация, которой вы хотели бы поделиться с редакторами",
      cancelButton: "Отмена",
      submitButton: "Отправить статью",
      submittingButton: "Отправка...",
      validationError: "Пожалуйста, заполните все обязательные поля",
      fileRequired: "Пожалуйста, загрузите файл вашей статьи",
      successMessage: "Ваша статья успешно отправлена!",
      errorMessage: "Не удалось отправить статью. Пожалуйста, попробуйте еще раз.",
      helpText: "Нужна помощь с отправкой? Свяжитесь с нашей редакционной командой по адресу",
    },
    articles: {
      title: "Научные статьи",
      search: "Поиск статей...",
      noResults: "Статьи не найдены.",
      columns: {
        title: "Название",
        authors: "Авторы",
        category: "Категория",
        createdAt: "Дата публикации",
        file: "Файл",
      },
    },
    journals: {
      title: "Научные журналы",
      field: "Область",
      frequency: "Периодичность публикации",
    },
    authors: {
      title: "Ведущие авторы",
      field: "Область исследований",
      publications: "Публикации",
    },
    resources: {
      title: "Ресурсы для исследований",
      download: "Скачать",
    },
    admin: {
      dashboard: "Панель управления",
      sidebar: {
        dashboard: "Панель управления",
        articles: "Статьи",
        journals: "Журналы",
        authors: "Авторы",
        resources: "Ресурсы",
      },
      stats: {
        articles: "Всего статей",
        journals: "Всего журналов",
        authors: "Всего авторов",
        resources: "Всего ресурсов",
      },
      articles: {
        title: "Управление статьями",
        create: "Создать статью",
        edit: "Редактировать",
        delete: "Удалить",
        search: "Поиск статей...",
        noResults: "Статьи не найдены.",
        columns: {
          title: "Название",
          authors: "Авторы",
          category: "Категория",
          status: "Статус",
          createdAt: "Дата создания",
          actions: "Действия",
        },
        create_p: {
          button: "Создать статью",
          title: "Создать новую статью",
          description: "Заполните данные ниже для создания новой статьи.",
          form: {
            title: "Название",
            titlePlaceholder: "Введите название статьи",
            abstract: "Аннотация",
            abstractPlaceholder: "Введите аннотацию статьи",
            authors: "Авторы",
            authorsPlaceholder: "Введите имена авторов (через запятую)",
            category: "Категория",
            categoryPlaceholder: "Выберите категорию",
            submit: "Создать статью",
            file: "Файл",
            filePlaceholder: "Выберите PDF-файл статьи",
            status: "Статус",
            statusPlaceholder: "Выберите статус",
          },
          success: "Статья успешно создана",
          error: "Не удалось создать статью",
        },
      },
      resources: {
        title: "Управление ресурсами",
        create: "Создать ресурс",
        edit: "Редактировать",
        delete: "Удалить",
        search: "Поиск ресурсов...",
        noResults: "Ресурсы не найдены.",
        columns: {
          title: "Название",
          type: "Тип",
          category: "Категория",
          downloads: "Загрузки",
          status: "Статус",
          createdAt: "Дата создания",
          actions: "Действия",
        },
      },
      journals: {
        title: "Управление журналами",
        create: "Создать журнал",
        edit: "Редактировать",
        delete: "Удалить",
        see: "Посмотреть",
        search: "Поиск журналов...",
        noResults: "Журналы не найдены.",
        columns: {
          title: "Название",
          field: "Область",
          issn: "ISSN",
          frequency: "Периодичность",
          status: "Статус",
          createdAt: "Дата создания",
          actions: "Действия",
          year: "Год",
        },
      },
      authors: {
        title: "Управление авторами",
        create: "Создать автора",
        edit: "Редактировать",
        delete: "Удалить",
        search: "Поиск авторов...",
        noResults: "Авторы не найдены.",
        cancel: "Отмена",
        updating: "Обновление...",
        updateSuccess: "Автор успешно обновлен",
        updateError: "Ошибка обновления автора",
        columns: {
          name: "Имя",
          institution: "Учреждение",
          field: "Область",
          publications: "Публикации",
          status: "Статус",
          createdAt: "Дата создания",
          actions: "Действия",
        },
      },
      login: {
        title: "Вход в панель администратора",
        description: "Введите свои учетные данные для доступа к панели администратора",
        emailLabel: "Email",
        emailPlaceholder: "Введите ваш email",
        passwordLabel: "Пароль",
        passwordPlaceholder: "Введите ваш пароль",
        rememberMe: "Запомнить меня",
        loginButton: "Войти",
        invalidCredentials: "Неверный email или пароль",
      },
    },
  },
  uz: {
    navigation: {
      articles: "Maqolalar",
      journals: "Jurnallar",
      authors: "Mualliflar",
      resources: "Resurslar",
    },
    hero: {
      title: "Hamkorlik orqali tadqiqotlarni rivojlantirish",
      description:
        "Ilmiy guruhlar uchun nashr etish, hamkorlik qilish va ilmiy bilimlarni rivojlantirish uchun keng qamrovli platforma. Integratsiyalashgan vositalar va ekspert baholash tizimi yordamida nashr jarayonini optimallashing.",
      browseButton: "Maqolalarni ko'rish",
      submitButton: "Tadqiqot yuborish",
    },
    features: {
      title: "Nashr xususiyatlari",
      peerReview: {
        title: "Ekspert baholash tizimi",
        description: "Turli sohalar bo'yicha ekspertlar bilan ikki tomonlama ko'r baholash jarayoni",
      },
      citation: {
        title: "Iqtiboslarni boshqarish",
        description:
          "Turli formatlarni (APA, MLA, Chicago) qo'llab-quvvatlovchi integratsiyalashgan iqtibos vositalari",
      },
      analytics: {
        title: "Tadqiqot tahlili",
        description:
          "Iqtiboslar, yuklab olishlar va tadqiqot ta'siri ko'rsatkichlarini kuzatish uchun keng qamrovli tahlil paneli",
      },
    },
    video: {
      title: "Jurnalimiz haqida bilib oling",
      description:
        "Jurnalning vazifasi, ta'siri va tadqiqotlaringizni qanday kiritish haqida ko'proq ma'lumot olish uchun videomizni tomosha qiling.",
      videoTitle: "SciPublish jurnali sharhi",
      caption:
        "Bizning ko'rib chiqish jarayonimiz, nashr standartlari va biz bilan nashr etishning afzalliklari haqida bilib oling.",
    },
    partners: {
      title: "Bizning akademik hamkorlarimiz",
      description:
        "Biz ilmiy bilimlarni rivojlantirish uchun dunyo bo'ylab yetakchi universitetlar va tadqiqot institutlari bilan hamkorlik qilamiz.",
    },
    common: {
      submitPaper: "Maqola yuborish",
      footer: " 2024 SciPublish. Hamkorlik orqali ilmiy bilimlarni rivojlantirish.",
      phoneNumber: "+998 (71) 123-45-67",
    },
    search: {
      title: "Qidiruv",
      placeholder: "Maqolalar, jurnallar, mualliflarni qidirish...",
      button: "Qidirish",
      searching: "Qidirilmoqda...",
      recentSearches: "So'nggi qidiruv so'rovlari",
    },
    submit: {
      title: "Ilmiy maqolangizni yuboring",
      description: "Ilmiy maqolangizni ko'rib chiqish va nashr etish uchun quyidagi shaklni to'ldiring.",
      formTitle: "Maqola yuborish shakli",
      formDescription: "Iltimos, maqolangiz haqida barcha kerakli ma'lumotlarni taqdim eting.",
      titleLabel: "Maqola sarlavhasi",
      titlePlaceholder: "Maqolangizning to'liq sarlavhasini kiriting",
      authorsLabel: "Mualliflar",
      authorsPlaceholder: "Mualliflar nomlarini kiriting (vergul bilan ajratilgan)",
      authorsHelp: "Barcha mualliflarni nashrda ko'rinishi kerak bo'lgan tartibda ro'yxatlang.",
      abstractLabel: "Annotatsiya",
      abstractPlaceholder: "Tadqiqotingiz haqida qisqacha ma'lumot bering (250-300 so'z)",
      categoryLabel: "Tadqiqot kategoriyasi",
      categoryPlaceholder: "Kategoriyani tanlang",
      keywordsLabel: "Kalit so'zlar",
      keywordsPlaceholder: "Kalit so'zlarni kiriting (vergul bilan ajratilgan)",
      keywordsHelp: "Tadqiqotingizni eng yaxshi tavsiflaydigan 5-8 ta kalit so'zlarni kiriting.",
      fileLabel: "Maqola fayli",
      dropzoneText: "Faylingizni shu yerga tashlang yoki ko'rib chiqish uchun bosing",
      fileFormats: "Qabul qilinadigan formatlar: PDF, DOCX (Maksimal hajm: 10MB)",
      browseButton: "Fayllarni ko'rish",
      commentsLabel: "Qo'shimcha izohlar",
      commentsPlaceholder: "Muharrirlar bilan baham ko'rmoqchi bo'lgan har qanday qo'shimcha ma'lumot",
      cancelButton: "Bekor qilish",
      submitButton: "Maqolani yuborish",
      submittingButton: "Yuborilmoqda...",
      validationError: "Iltimos, barcha majburiy maydonlarni to'ldiring",
      fileRequired: "Iltimos, maqola faylini yuklang",
      successMessage: "Maqolangiz muvaffaqiyatli yuborildi!",
      errorMessage: "Maqolani yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
      helpText: "Yuborish bo'yicha yordam kerakmi? Tahririyat jamoamiz bilan bog'laning",
    },
    articles: {
      title: "Ilmiy maqolalar",
      search: "Maqolalarni qidirish...",
      noResults: "Maqolalar topilmadi.",
      columns: {
        title: "Sarlavha",
        authors: "Mualliflar",
        category: "Kategoriya",
        createdAt: "Nashr sanasi",
        file: "Fayil"
      },
    },
    journals: {
      title: "Ilmiy jurnallar",
      field: "Soha",
      frequency: "Nashr davriyligi",
    },
    authors: {
      title: "Taniqli mualliflar",
      field: "Tadqiqot sohasi",
      publications: "Nashrlar",
    },
    resources: {
      title: "Tadqiqot resurslari",
      download: "Yuklab olish",
    },
    admin: {
      dashboard: "Boshqaruv paneli",
      sidebar: {
        dashboard: "Boshqaruv paneli",
        articles: "Maqolalar",
        journals: "Jurnallar",
        authors: "Mualliflar",
        resources: "Resurslar",
        submissions: "Yuborilgan maqolalar",
      },
      stats: {
        articles: "Jami maqolalar",
        journals: "Jami jurnallar",
        authors: "Jami mualliflar",
        resources: "Jami resurslar",
      },
      articles: {
        title: "Maqolalarni boshqarish",
        create: "Maqola yaratish",
        edit: "Tahrirlash",
        delete: "O'chirish",
        search: "Maqolalarni qidirish...",
        noResults: "Maqolalar topilmadi.",
        columns: {
          title: "Sarlavha",
          authors: "Mualliflar",
          category: "Kategoriya",
          status: "Holat",
          createdAt: "Yaratilgan sana",
          actions: "Amallar",
        },
        create_p: {
          button: "Maqola yaratish",
          title: "Yangi maqola yaratish",
          description: "Yangi maqola yaratish uchun quyidagi ma'lumotlarni to'ldiring.",
          form: {
            title: "Sarlavha",
            titlePlaceholder: "Maqola sarlavhasini kiriting",
            abstract: "Annotatsiya",
            abstractPlaceholder: "Maqola annotatsiyasini kiriting",
            authors: "Mualliflar",
            authorsPlaceholder: "Mualliflar ismini kiriting (vergul bilan ajrating)",
            category: "Kategoriya",
            categoryPlaceholder: "Kategoriyani tanlang",
            submit: "Maqola yaratish",
            file: "Maqola fayli",
            filePlaceholder: "Maqola faylni tanlang",
            status: "Holat",
            statusPlaceholder: "Holatni tanlang",
          },
          success: "Maqola muvaffaqiyatli yaratildi",
          error: "Maqola yaratishda xatolik yuz berdi",
        },
      },
      resources: {
        title: "Resurslarni boshqarish",
        create: "Resurs yaratish",
        edit: "Tahrirlash",
        delete: "O'chirish",
        search: "Resurslarni qidirish...",
        noResults: "Resurslar topilmadi.",
        columns: {
          title: "Sarlavha",
          type: "Turi",
          category: "Kategoriya",
          downloads: "Yuklab olishlar",
          status: "Holat",
          createdAt: "Yaratilgan sana",
          actions: "Amallar",
        },
      },
      journals: {
        title: "Jurnallarni boshqarish",
        create: "Jurnal yaratish",
        edit: "Tahrirlash",
        delete: "O'chirish",
        search: "Jurnallarni qidirish...",
        noResults: "Jurnallar topilmadi.",
        see: "Ko'rish",
        columns: {
          title: "Sarlavha",
          field: "Soha",
          issn: "ISSN",
          frequency: "Davriylik",
          status: "Holat",
          createdAt: "Yaratilgan sana",
          actions: "Amallar",
          year: "Yil",
        },
      },
      submissions: {
        title: "Yuborilgan maqolalarni boshqarish",
        viewTitle: "Maqola tafsilotlari",
        back: "Orqaga",
        view: "Ko'rish",
        download: "Yuklab olish",
        approve: "Tasdiqlash",
        reject: "Rad etish",
        resetStatus: "Kutish holatiga qaytarish",
        statusActive: "Tasdiqlangan",
        statusInactive: "Rad etilgan",
        statusPending: "Kutilmoqda",
        submittedOn: "Yuborilgan sana",
        authors: "Mualliflar",
        category: "Kategoriya",
        keywords: "Kalit so'zlar",
        abstract: "Annotatsiya",
        comments: "Qo'shimcha izohlar",
        file: "Maqola fayli",
        tableCaption: "Barcha yuborilgan maqolalar ro'yxati",
        noResults: "Yuborilgan maqolalar topilmadi.",
        columns: {
          title: "Sarlavha",
          authors: "Mualliflar",
          category: "Kategoriya",
          status: "Holat",
          createdAt: "Yuborilgan sana",
          actions: "Amallar",
        },
      },
      authors: {
        title: "Mualliflarni boshqarish",
        create: "Muallif yaratish",
        edit: "Tahrirlash",
        delete: "O'chirish",
        search: "Mualliflarni qidirish...",
        noResults: "Mualliflar topilmadi.",
        cancel: "Bekor qilish",
        updating: "Yangilanmoqda...",
        updateSuccess: "Muallif muvaffaqiyatli yangilandi",
        updateError: "Muallifni yangilashda xatolik yuz berdi",
        columns: {
          name: "Ism",
          institution: "Muassasa",
          field: "Soha",
          publications: "Nashrlar",
          status: "Holat",
          createdAt: "Yaratilgan sana",
          actions: "Amallar",
        },
      },
      login: {
        title: "Admin panelga kirish",
        description: "Admin panelga kirish uchun ma'lumotlaringizni kiriting",
        emailLabel: "Email",
        emailPlaceholder: "Emailingizni kiriting",
        passwordLabel: "Parol",
        passwordPlaceholder: "Parolingizni kiriting",
        rememberMe: "Meni eslab qol",
        loginButton: "Kirish",
        invalidCredentials: "Email yoki parol noto'g'ri",
      },
    },
  },
}
export type Language = keyof typeof translations
export type AdminSubmissions = {
  title?: string;
  viewTitle?: string;
  back?: string;
  view?: string;
  download?: string;
  approve?: string;
  reject?: string;
  resetStatus?: string;
  statusActive?: string;
  statusInactive?: string;
  statusPending?: string;
  submittedOn?: string;
  authors?: string;
  category?: string;
  keywords?: string;
  abstract?: string;
  comments?: string;
  file?: string;
  tableCaption?: string;
  noResults?: string;
  columns?: {
    title?: string;
    authors?: string;
    category?: string;
    status?: string;
    createdAt?: string;
    actions?: string;
  };
}

export type AdminSection = {
  dashboard: string;
  sidebar: {
    dashboard: string;
    articles: string;
    journals: string;
    authors: string;
    resources: string;
    submissions: string;
  };
  stats: {
    articles: string;
    journals: string;
    authors: string;
    resources: string;
  };
  articles: any;
  journals: any;
  resources: any;
  authors: any;
  submissions?: AdminSubmissions;
  login: any;
}

export type Translation = {
  navigation: {
    articles: string;
    journals: string;
    authors: string;
    resources: string;
  };
  hero: {
    title: string;
    description: string;
    browseButton: string;
    submitButton: string;
  };
  features: any;
  video: any;
  partners: any;
  common: any;
  search: any;
  submit: any;
  articles: any;
  authors: any;
  resources: any;
  admin: AdminSection;
}
export type CreateArticleDialogTranslations = Translation["admin"]["articles"]["create_p"]

