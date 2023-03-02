FROM node:19-alpine

WORKDIR /user/src/app

RUN npm install pm2 -g

EXPOSE 80

CMD ["npm","run", "startDev"]
# CMD [ "npx", "pm2-runtime", "npm", "--", "start" ]