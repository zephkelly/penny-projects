module.exports = {
    apps: [
        {
            name: 'PennyProjects',
            port: 8002,
            exec_mode: 'cluster',
            instances: '1',
            script: './.output/server/index.mjs',
        }
    ]
}