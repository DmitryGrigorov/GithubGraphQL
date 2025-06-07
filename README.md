# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# GithubGraphQL

## Описание проекта

Этот проект представляет собой клиентское приложение для работы с GitHub API через GraphQL. Он позволяет пользователям просматривать свои репозитории, профиль, управлять ветками и создавать новые репозитории. Приложение разработано с использованием React, Ant Design и Apollo Client для взаимодействия с GitHub GraphQL API.

## Основные функции

- **Просмотр репозиториев**: Список репозиториев пользователя с возможностью фильтрации и сортировки.
- **Профиль пользователя**: Отображение информации о пользователе, включая аватар, био, количество репозиториев, подписчиков и подписок.
- **Управление ветками**: Просмотр и управление ветками репозиториев.
- **Создание репозиториев**: Форма для создания новых репозиториев с выбором видимости.
- **Документация GraphQL мутаций**: Страница с примерами и описаниями основных GraphQL мутаций для работы с GitHub API.

## Технологии

- **React**: Библиотека для создания пользовательских интерфейсов.
- **Ant Design**: UI-библиотека для создания красивых и отзывчивых интерфейсов.
- **Apollo Client**: Клиент для работы с GraphQL API.
- **TypeScript**: Типизированный JavaScript для улучшения качества кода.

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone <url-репозитория>
   cd github-client
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите приложение в режиме разработки:
   ```bash
   npm start
   ```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть приложение.

## Скрипты

- `npm start`: Запускает приложение в режиме разработки.
- `npm test`: Запускает тесты в интерактивном режиме.
- `npm run build`: Собирает приложение для продакшена в папку `build`.
- `npm run eject`: Извлекает конфигурацию из Create React App (необратимая операция).

## Дополнительная информация

Для получения дополнительной информации о проекте и его использовании, обратитесь к документации [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) и [React](https://reactjs.org/).
