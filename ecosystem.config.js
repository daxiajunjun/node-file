module.exports = {
  apps: [{
    name: 'node file',
    script: './bin/www',
    cwd: '.',
    instances: 'max',
    autorestart: true,
    watch: true,
    ignore_watch: ['node_modules', 'public', 'logs', 'views', 'package.json', 'config', '.git/*'],
    max_memory_restart: '1G',
    out_file: './logs/app.log',
    error_file: './logs/err.log',
    listen_timeout: 8000,
    kill_timeout: 1600,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
