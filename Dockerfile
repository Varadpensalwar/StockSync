# Use official Node.js LTS image (Debian, not Alpine)
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port (if needed for webhook)
EXPOSE 3000

# Start the bot
CMD ["node", "dist/bot/telegram-bot.js"] 