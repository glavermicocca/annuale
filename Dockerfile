#WEBAPP
FROM node:lts-stretch AS app-build
WORKDIR /app/WebApp
COPY ./annuale-client .
#ENV NODE_OPTIONS=--max_old_space_size=256000
#RUN npm cache clean --force
RUN npm install --legacy-peer-deps
RUN npm run build

#SERVER
FROM node:lts-stretch AS server-build
WORKDIR /root/ServerApp
COPY ./annuale ./
#RUN npm cache clean --force
#ENV NODE_OPTIONS=--max_old_space_size=256000
RUN npm install --legacy-peer-deps &&\
    apt-get update &&\
    apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
## MERGE with WEBAPP
COPY --from=app-build /app/WebApp/build /root/ServerApp/build

EXPOSE 3000

CMD ["npm", "run", "prod"]
