//define type for environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      API_URL: string
    }
  }
}
