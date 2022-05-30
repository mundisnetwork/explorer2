FROM node:12-bullseye

LABEL maintainer="Marius Gherghief (marius.gherghief@gmail.com)"

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update \
    && apt-get -y install \
    curl \
    wget \
    bzip2 \
    locales \
    libssl-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    libaio1 \
    default-libmysqlclient-dev \
    default-mysql-client \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
    python3-pip \
    python3-venv \
    supervisor \
    cron \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen

ENV LC_ALL C.UTF-8

RUN mkdir -p /opt/mundis-network-explorer
WORKDIR /opt/mundis-network-explorer

ADD static /opt/mundis-network-explorer/static
ADD programs /opt/mundis-network-explorer/programs
ADD ui /opt/mundis-network-explorer/ui
ADD rollup.config.js /opt/mundis-network-explorer/
ADD tailwind.config.js /opt/mundis-network-explorer/
ADD package.json /opt/mundis-network-explorer/
ADD yarn.lock /opt/mundis-network-explorer/
COPY mundis-network-explorer.cron /etc/cron.d/mundis-network-explorer.cron
COPY supervisord.conf /etc/supervisor/supervisord.conf

RUN chown node:node /etc/cron.d/mundis-network-explorer.cron && \
    crontab /etc/cron.d/mundis-network-explorer.cron && \
    chown node:node /etc/supervisor/supervisord.conf && \
    mkdir -p /var/log/supervisor/ && \
    chown node:node -R /var/log/supervisor/ && \
    mkdir -p /var/run/supervisor/ && \
    chown node:node -R /var/run/supervisor/ && \
    chown node:node -R /opt/mundis-network-explorer/

RUN yarn install --frozen-lockfile && \
    yarn install-pwa && \
    yarn clean-ui && \
    yarn build-ui

# RUN pip3 install -r programs/requirements.txt && \
#     pip3 install -U setuptools wheel build && \
#     python3 -m build programs/ && \
#     pip3 install -e programs

EXPOSE 3000

ENV BACKEND_SHELL /bin/bash

ENV NODE_ENV production

USER node
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]