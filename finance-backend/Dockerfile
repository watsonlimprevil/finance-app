# 1. Use official Node image
FROM node:20-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the backend code
COPY . .

# 6. Expose the backend port (optional but good practice)
EXPOSE 5000

# 7. Start the backend
CMD ["npm", "start"]
