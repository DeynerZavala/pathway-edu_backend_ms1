# Utiliza la imagen oficial de Node.js como base
FROM node:22-alpine3.19

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que corre la aplicación
EXPOSE 3001

# Define el comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
