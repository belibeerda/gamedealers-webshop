# GameDealers - Интернет-магазин цифровых продуктов
## Описание проекта

GameDealers - это веб-приложение для продажи цифровых версий компьютерных игр, пополнения баланса Steam и других игровых сервисов. Проект включает:

- 📋 Каталог товаров с фильтрацией

- 🔍 Систему поиска по названию и тегам

- 🛒 Корзину и процесс оформления заказа

- 📱 Полностью адаптивный интерфейс

## Технический стек
### Frontend

- HTML5, CSS3 (SCSS)

- JavaScript (ES6+)

- Google Sheets API - как временная БД

### Backend (планируется)

- Node.js + Express

- MongoDB

## Установка и запуск (для разработки)

1. Клонируйте репозиторий:

```bash
git clone https://github.com/ваш-username/gamedealers.git
cd gamedealers
```

2. Установите зависимости:

```bash
npm install
```
3.Запустите dev-сервер:

```bash
npm run start
```

## Структура проекта
```
gamedealers/
├── index.html          # Главная страница
├── product.html        # Страница товара (шаблон)
├── search.html         # Страница поиска
├── css/
│   ├── main.scss       # Основные стили
│   ├── product.scss    # Стили страницы товара
│   └── search.scss     # Стили поиска
├── js/
│   ├── main.js         # Главный скрипт
│   ├── product.js      # Логика страницы товара
│   └── search.js       # Поиск и фильтрация
├── images/             # Локальные изображения
└── api/                # Скрипты для работы с API
    └── sheets.js       # Google Sheets API
```

## Настройка Google Sheets API

1. Создайте таблицу в Google Sheets с колонками:

- id, name, price, image, action, tags, link, description, screenshots

2. Включите Google Sheets API в Google Cloud Console

2. Создайте API ключ и укажите его в js/api/sheets.js:

```javascript
const CONFIG = {
  SPREADSHEET_ID: 'ваш-id-таблицы',
  API_KEY: 'ваш-api-ключ',
  SHEET_NAME: 'Games' // Название листа
};
```

## Особенности реализации

1. Динамические страницы товаров:

- Все товары используют один HTML-шаблон

- Данные подгружаются из Google Sheets по ID

2. Оптимизация загрузки:

- Ленивая загрузка изображений

- Прелоадер контента

3. Адаптивный дизайн:

- Desktop-first подход

- Гибкие сетки (CSS Grid + Flexbox)

- Оптимизация для разных разрешений

## Планы по развитию

- Реализация корзины и оформления заказа

- Оптимизация подгрузок страниц

- Система пользовательских аккаунтов

- Оценки и отзывы к товарам

- Перенос данных с Google Sheets на нормальную БД