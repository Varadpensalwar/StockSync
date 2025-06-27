# StockSync Telegram Bot

A Node.js TypeScript Telegram bot for stock-related tasks, powered by AI and integrated with databases and Excel.

## Features
- Telegram bot integration
- AI-powered features (OpenAI, LangChain)
- Database support (Prisma)
- Excel file handling

## Folder Structure
```
project/
├── src/
│   ├── bot/
│   ├── ai/
│   ├── database/
│   ├── services/
│   └── utils/
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your secrets.
3. Run the bot:
   ```bash
   npm run build && npm start
   ```

## Scripts
- `npm run build` — Compile TypeScript
- `npm start` — Start the bot

## Deployment (Railway/Render)

### 1. Set up environment variables
- `TELEGRAM_BOT_TOKEN`
- `OPENAI_API_KEY`
- `DATABASE_URL`

### 2. Deploy with Docker
Both Railway and Render support Dockerfile-based deployments. Your Dockerfile is ready for production.

#### Railway
- Create a new Railway project.
- Connect your repo or upload code.
- Set environment variables in the Railway dashboard.
- Deploy! Railway will build and run your Dockerfile.

#### Render
- Create a new Web Service.
- Connect your repo.
- Set environment variables in the Render dashboard.
- Render will detect the Dockerfile and build accordingly.

### 3. Database
- Provision a PostgreSQL database on Railway/Render.
- Set the `DATABASE_URL` environment variable accordingly.
- Run migrations if needed (see Prisma docs).

### 4. Webhooks (Optional)
- If you want to use Telegram webhooks instead of polling, expose a port and set the webhook URL in your bot settings.

### 5. (Optional) Run Prisma Migrations
If you have migrations, you can run:
```
npx prisma migrate deploy
```

---
MIT License 