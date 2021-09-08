# Bee-Factory VPS

## Disclaimer

This is not an official Ethersphere product.

This makes major modifications to the target server, exposing it to security risks.

Make sure you read and understand `agent.sh`.

## Description

This tool is intended for developers who want to run [Bee-Factory](https://github.com/ethersphere/bee-factory) on a VPS.

It sets up [Bee-Factory](https://github.com/ethersphere/bee-factory) on a fresh VPS automatically and runs Bee, without ever having to `ssh` to the server.

These servers are intended to be disposable and short-lived, used for developing on Swarm.

Requires `root` user with password authentication method.

## Usage

What you need to do:

1. Create a new Ubuntu 20.04 VPS (tested with DigitalOcean $5 VPS)
2. Set `host`, `username` and `password` in `settings.json`
3. Run `npm i && npm start`

What will happen:

1. `agent.sh`, `nginx.conf` and `bee.env` will be copied to the VPS
2. `agent.sh` is executed using the `node-ssh` package
3. A single ephemeral Bee instance will be created using [Bee-Factory](https://github.com/ethersphere/bee-factory)
4. Bee endpoints will be exposed using nginx reverse proxies on ports `8080` and `8081`
