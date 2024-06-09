################STAGE 1 #####################

FROM node:21 AS backend-builder

# Setup the working dir

WORKDIR /app

#code
COPY . .

RUN npm i

####################STAGE 2 ##################

FROM node:21-slim

#Setup the working dir

WORKDIR /app

COPY --from=backend-builder /app .

#Port

EXPOSE 8000

CMD ["npm", "start"]
