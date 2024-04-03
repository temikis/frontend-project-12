export default {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    validate: {
      min3max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      required: 'Обязательное поле',
      oneOf: 'Пароли должны совпадать',
      notOneOf: 'Должно быть уникальным',
      mute: 'Должно быть культурным',
    },
    errors: {
      userExists: 'Такой пользователь уже существует',
    },
    buttons: {
      enter: 'Войти',
      signUp: 'Регистрация',
      exit: 'Выйти',
      cancel: 'Отменить',
      send: 'Отправить',
      delete: 'Удалить',
      counter: {
        count_one: '{{count}} клик',
        count_few: '{{count}} клика',
        count_many: '{{count}} кликов',
      },
      reset: 'Сбросить',
    },
    loginPage: {
      logo: 'Войти',
      title: 'Войти',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        feedback: 'Неверные имя пользователя или пароль',
      },
      footer: {
        sentence: 'Нет аккаунта? ',
        link: 'Регистрация',
      },
    },
    signUp: {
      logo: 'Регистрация',
      title: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
      },
    },
    notFoundPage: {
      logo: 'Страница не найдена',
      title: 'Страница не найдена',
      sentence: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    spinner: {
      title: 'Загрузка...',
    },
    modal: {
      addChannel: {
        title: 'Добавить канал',
        name: 'Имя канала',
      },
      removeChannel: {
        title: 'Удалить канал',
        p: 'Уверены?',
      },
      renameChannel: {
        title: 'Переименовать канал',
        name: 'Имя канала',
      },
    },
    chat: {
      headerChannel: {
        title: 'Каналы',
      },
      headerMessage: {
        messageCount: {
          message_zero: '{{count}} сообщений',
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
      },
      channelList: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
      input: {
        label: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
      },
    },
    toast: {
      createChannel: 'Канал создан',
      renameChannel: 'Канал переименован',
      deleteChannel: 'Канал удалён',
      errorNetwork: 'Ошибка соединения',
    },
  },
};
