FROM node:20-alpine

# Diretório da aplicação
WORKDIR /app

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Build do TypeScript (opcional, se você compilar antes)
RUN npm run build

# Porta que o container vai expor
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]