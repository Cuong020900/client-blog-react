import environment from 'config/environment'

let config = {
  // All config value will be here
  baseUrl: 'http://127.0.0.1:3000'
}

config = {...config, ...environment}

export default config
