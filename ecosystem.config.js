const interpreter = process.env.NODE_PATH

module.exports = {
  apps: [
    {
      interpreter,
      script: 'npm',
      args: 'start',
      exec_mode: 'cluster',
      name: 'nanahouse',
      env: {
        PORT: 3000
      }
    }
  ]
}
