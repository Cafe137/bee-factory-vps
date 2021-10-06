const fs = require('fs')
const { NodeSSH } = require('node-ssh')

/**
 * @param {NodeSSH} ssh
 */
async function runCommandAndStreamMessages(ssh, command, cwd) {
    try {
        await ssh.exec(command, [], {
            cwd,
            onStdout(chunk) {
                process.stdout.write(chunk.toString('utf8'))
            },
            onStderr(chunk) {
                process.stderr.write(chunk.toString('utf8'))
            }
        })
    } catch {}
}

async function main() {
    const settings = {
        host: process.env.BEE_HOST,
        username: process.env.BEE_USERNAME,
        password: process.env.BEE_PASSWORD
    }
    const ssh = new NodeSSH()
    await ssh.connect(settings)
    await ssh.putFile('agent.sh', '/root/agent.sh')
    await runCommandAndStreamMessages(ssh, 'bash /root/agent.sh')
    ssh.dispose()
}

main()
