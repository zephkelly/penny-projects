module.exports = {
    apps: [
        {
            name: 'Penny Projects',
            port: 9000,
            exec_mode: 'cluster',
            instances: '1',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start'
        }
    ]
}