# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/contribmatch-server

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port your app listens on (adjust if needed)
EXPOSE 3000

# Run the compiled app
CMD ["node", "dist/index.js"]