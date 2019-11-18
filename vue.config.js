module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        bypassOnDebug: true
      }).end()
  },
  css: {
    extract: { ignoreOrder: true }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  productionSourceMap: false,
  publicPath: '/vue2/',
  transpileDependencies: ['vuetify']
}
