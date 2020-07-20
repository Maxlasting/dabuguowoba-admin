module.exports = {
  dev: {
    publicPath: '/',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8734',
        changeOrigin: true,
      }
    },
  },
  build: {
    publicPath: '/',
  },
}
