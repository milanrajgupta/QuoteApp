###################### STAGE 1: BUILD STAGE ####################

FROM node:21 AS frontend-builder

# Setup the working directory to /app

WORKDIR /app

# Copy the package.json and package-lock.json for dependency installation

COPY package*.json ./

# Install dependencies

RUN npm i

# Copy the rest of the application code

COPY . .

##################### STAGE 2: FINAL STAGE #######################

FROM node:21-slim

# Set the working directory to /app

WORKDIR /app

# Copy built assets and  dependencies from frontend-builder stage

COPY --from=frontend-builder /app .

#Expose post 3000 for the Node.js application

EXPOSE 3000

# Define the default command to run the application in development

CMD ["npm", "start"]
