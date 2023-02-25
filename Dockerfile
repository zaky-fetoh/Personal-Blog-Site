FROM node:19-alpine

WORKDIR /user/src/app

EXPOSE 80

CMD ["npm","run", "startDev"]
