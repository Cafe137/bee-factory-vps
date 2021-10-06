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

1. Create a new Ubuntu 20.04 VPS (tested with DigitalOcean $10 VPS)
2. Set `BEE_HOST`, `BEE_USERNAME` and `BEE_PASSWORD` environment variables
3. Run `npm i && npm start`

What will happen:

1. `agent.sh` will be copied to the VPS and executed using the `node-ssh` package
2. One queen and one worker ephemeral Bee instances will be created using [Bee-Factory](https://github.com/ethersphere/bee-factory)
3. Bee endpoints will be exposed on ports `1633`, `1635` and `11633`, `11635`
