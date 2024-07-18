module.exports = {
    apps: [
        {
            name: 'PennyProjects',
            port: 8002,
            exec_mode: 'cluster',
            instances: '1',
            script: './node_modules/nuxt/bin/nuxt.mjs',
            args: 'start'
        }
    ]
}