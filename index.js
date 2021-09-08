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
    const ssh = new NodeSSH()
    await ssh.connect(JSON.parse(fs.readFileSync('settings.json')))
    await ssh.putFile('agent.sh', '/root/agent.sh')
    await ssh.putFile('nginx.conf', '/root/nginx.conf')
    await ssh.putFile('bee.env', '/root/bee.env')
    await runCommandAndStreamMessages(ssh, 'bash /root/agent.sh')
    ssh.dispose()
}

main()
