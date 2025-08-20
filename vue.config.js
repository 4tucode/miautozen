const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // Configure index.html defaults via html-webpack-plugin
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'MiAutoZen'
    }
  }
})
