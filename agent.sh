#!/bin/bash

# create 1G swap
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
free -h

# install required packages
apt-get update
apt-get install python -y
apt-get install docker.io -y
apt-get install build-essential -y
docker container ls

# install nvm, node.js 16 and yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 16
node -v
npm i -g yarn

# run bee-factory
GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" git clone https://github.com/ethersphere/bee-factory.git
cd bee-factory
yarn install
./scripts/network.sh
./scripts/blockchain.sh
npm run migrate:contracts
npm run supply
chmod -R 777 ./scripts/bee-data-dirs

# run bee
./scripts/bee.sh start --workers=1 --ephemeral --hostname=0.0.0.0
