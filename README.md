# GameDealers: Интернет-магазин цифровых товаров

https://gamedealers.onrender.com/

## Описание проекта
Данный проект представляет собой современный и функциональный веб-сайт интернет-магазина, специализирующегося на продаже компьютерных игр и других цифровых товаров. Разработанное решение нацелено на существенное улучшение пользовательского опыта путем предоставления интуитивно понятного интерфейса, расширенных возможностей для поиска и фильтрации товаров, а также оптимизации процесса покупки. Проект призван решить проблемы, связанные с перегруженностью интерфейсов и неэффективностью навигации, характерные для многих существующих маркетплейсов цифровых товаров.

## Ключевые возможности

- Обширный каталог товаров: Удобное представление большого ассортимента цифровых продуктов.
- Продвинутый поиск: Быстрый и точный поиск товаров по названию и ключевым тегам.
- Динамическая фильтрация: Фильтрация товаров по множеству критериев, включая жанры и игровые платформы, с использованием интерактивных выпадающих списков.
- Гибкая сортировка: Возможность сортировки результатов поиска и фильтрации по цене (по возрастанию и убыванию).
- Интуитивный и адаптивный дизайн: Пользовательский интерфейс, который автоматически подстраивается под различные размеры экранов (ПК, планшеты, смартфоны).
- Детальные страницы товаров: Подробная информация о каждом продукте, включая описания, скриншоты и доступные платформы.
- Управление корзиной: Возможность просмотра и корректировки содержимого корзины перед оформлением заказа.
- Надежные механизмы безопасности: Внедрение встроенных средств защиты Django (CSRF, XSS, защита от SQL-инъекций через ORM, хеширование паролей) для обеспечения безопасности и стабильности работы.

## Используемые технологии

### Backend:
- Python 3.10.6
- Django 5.2.3
- PostgreSQL 17 

### Frontend:
- HTML5
- CSS3 (с использованием препроцессора SCSS)
- JavaScript (ES6+)

## Установка и запуск проекта

Чтобы запустить проект локально, следуйте этим шагам:

1. Клонируйте репозиторий:
```Bash
git clone https://github.com/belibeerda/gamedealers-webshop.git
cd YourRepoName
```
2. Установите PostgreSQL и Python
3. Создаем новую базу Postgres. Это можно сделать через графически интерфейс pg Admin или в командной строке SQL Shell
   ```SQL
   CREATE DATABASE gamedealers_db;
   ```
4. Cоздаем в ней таблицы:
   ```SQL
   -- Таблица для товаров
   CREATE TABLE products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(255),
        old_price DECIMAL(10, 2),
        discount_percent INTEGER,
        description TEXT,
        action_tags TEXT[],
        screenshot_urls TEXT[]
    );
    -- Таблица для жанров
    CREATE TABLE genres (
        genre_id SERIAL PRIMARY KEY,
        genre_name VARCHAR(100) UNIQUE NOT NULL
    );
    -- Таблица для платформ
    CREATE TABLE platforms (
        platform_id SERIAL PRIMARY KEY,
        platform_name VARCHAR(100) UNIQUE NOT NULL
    );
    -- Связующая таблица для товаров и жанров (многие ко многим)
    CREATE TABLE product_genres (
        product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(genre_id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, genre_id)
    );
    -- Связующая таблица для товаров и платформ (многие ко многим)
    CREATE TABLE product_platforms (
        product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE,
        platform_id INTEGER REFERENCES platforms(platform_id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, platform_id)
    );
    --Таблица популярных товаров
    CREATE TABLE popular_products (
        product_id VARCHAR(255) NOT NULL,
        PRIMARY KEY (product_id),
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    );
   ```
5. Установите права для пользователя(для уже существующего или создайте нового)
   ```SQL
   GRANT ALL PRIVILEGES ON TABLE genres TO postgres;
   GRANT ALL PRIVILEGES ON TABLE platforms TO postgres;
   GRANT ALL PRIVILEGES ON TABLE product_genres TO postgres;
   GRANT ALL PRIVILEGES ON TABLE product_platforms TO postgres;
   GRANT ALL PRIVILEGES ON TABLE products TO postgres;
   GRANT ALL PRIVILEGES ON TABLE popular_products TO postgres;
   ```
6. Переходим в проект. Вместо этой строчки в settings.py:
   ```python
   DATABASES = {
    'default': dj_database_url.parse(config("DATABASE_URL"))
    }
   ```
   Меняем на следующий код
   ```python
   DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'gamedealers_db',  # Замените на имя вашей БД
        'USER': 'postgres',  # Замените на пользователя БД
        'PASSWORD': '12345',  # Замените на пароль пользователя
        'HOST': 'localhost',  # Или IP адрес сервера БД
        'PORT': '5432',
        }
    }
   ```
7. Установите нужные библиотеки Python. В консоли необходимо работать из корневой папки shop.
   ```bash
   pip install python-decouple
   pip install whitenoise
   pip install psycopg2-binary
   ```
8. Проводим миграции
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
9.  Запускаем локальный сервер
   ```bash
   python manage.py runserver
   ```
Теперь вы можете открыть веб-сайт в браузере по адресу http://127.0.0.1:8000/. Админ-панель доступна по адресу http://127.0.0.1:8000/admin/.

### Использование приложения
- Откройте главную страницу или страницу поиска в браузере.
- Используйте поле поиска для поиска товаров по названию или тегам.
- Применяйте фильтры по жанрам и платформам для сужения результатов.
- Изменяйте порядок отображения товаров с помощью опций сортировки.
- Нажмите на любую карточку товара, чтобы перейти на страницу с подробной информацией.
- Используйте кнопку корзины на карточке товара для немедленного добавления в корзину через модальное окно.
- Нажмите на иконку корзины в шапке сайта, чтобы перейти к управлению корзиной.