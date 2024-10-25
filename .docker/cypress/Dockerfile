FROM cypress/base:latest

RUN apt-get update && apt-get install -y \
    fonts-noto-color-emoji \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /cypress

RUN npm install --save-dev cypress

CMD ["npx", "cypress", "run"]
