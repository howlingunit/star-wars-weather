FROM raspbian/stretch


RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y \
    python3 \
    sense-hat \
    curl

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs

COPY . /app
WORKDIR /app

RUN npm i

EXPOSE 8080
CMD [ "npm", "start" ]