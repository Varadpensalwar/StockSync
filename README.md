# StockSync Telegram Bot

A Node.js TypeScript Telegram bot for managing product stock, powered by AI (OpenAI, LangChain), integrated with a PostgreSQL database (via Prisma), and supporting Excel-based reporting. StockSync helps businesses and individuals track inventory, answer product queries, and generate reports—all from Telegram.

---

## 🚀 Features
- **Telegram Bot Integration**: Interact with your inventory directly from Telegram.
- **AI-Powered Intent Recognition**: Natural language commands for adding, querying, and deleting products.
- **Database Support**: Uses PostgreSQL via Prisma ORM for robust data management.
- **Excel Reporting**: Generate and receive Excel reports of your inventory.
- **Supplier Management**: Track suppliers for each product.
- **Low Stock Alerts**: Highlights low-stock items in reports.
- **Dockerized Deployment**: Ready for cloud platforms (Railway, Render, etc.).
- **Environment-based Configuration**: Securely manage secrets and settings.

---

## 📦 Tech Stack
- **Node.js** + **TypeScript**
- **Telegram Bot API** (`node-telegram-bot-api`)
- **OpenAI** + **LangChain** (AI/NLP)
- **Prisma** (ORM) + **PostgreSQL**
- **ExcelJS** (Excel file generation)
- **Docker** (containerization)

---

## 🗂️ Folder Structure
```
project/
├── src/
│   ├── bot/         # Telegram bot logic
│   ├── ai/          # AI agent and intent parsing
│   ├── database/    # Prisma service layer
│   ├── services/    # Excel/reporting utilities
│   └── utils/       # (Optional) Utility functions
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
```

---

## ⚡ Usage Examples
Interact with the bot in Telegram:

- **Add a product:**
  - `Add 50 iPhone 15s price 80000 from Apple`
  - _Bot:_ `Product 'iPhone 15' added with stock 50, price $80000, supplier Apple.`
- **Query stock:**
  - `What's the stock of iPhone 15?`
  - _Bot:_ `Stock for iPhone 15: 50`
- **Delete a product:**
  - `Delete iPhone 15`
  - _Bot:_ `Product 'iPhone 15' deleted.`
- **Get help:**
  - `/help`
  - _Bot:_ `You can ask about product stock, add new products, or ask general questions.`

---

## 🛠️ Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in your secrets:
     - `TELEGRAM_BOT_TOKEN`
     - `OPENAI_API_KEY`
     - `DATABASE_URL` (PostgreSQL connection string)
3. **Run the bot:**
   ```bash
   npm run build && npm start
   ```

---

## 🧑‍💻 Development & Contributing
- **Development mode:**
  ```bash
  npm run dev
  ```
  This uses `ts-node` for live TypeScript execution.
- **Prisma migrations:**
  ```bash
  npx prisma migrate dev
  ```
- **Code style:**
  - Use TypeScript strict mode.
  - Keep code modular (see `src/` structure).
- **Contributions:**
  - Fork, branch, and submit a pull request.
  - Please add tests and update documentation as needed.

---

## 🚢 Deployment (Railway/Render)

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
```bash
npx prisma migrate deploy
```

---

## 📄 License

MIT License © 2025 Varad Pensalwar

See [LICENSE](./LICENSE) for details. 