// const webpack = require('webpack')

module.exports = {
  server: {
    port: 3000
  },
  mode: 'universal',
  router: {
    middleware: ['authenticated']
  },
  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'Geounity',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'text/javascript',
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
        body: true
      }
    ]
  },
  devServer: {
    proxy: 'http://backend.test'
  },
  /*
   ** Customize the progress-      {
        type: 'text/javascript',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
        body: true
      },bar color
   */
  loading: { color: '#ff0' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],
  auth: {
    // Options
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss']
    // theme: {
    //   themes: {
    //     dark: {
    //       primary: '#008940',
    //       accent: '#0279D7',
    //       secondary: '#9F9F9F',
    //       info: '#0279D7',
    //       warning: '#B71C1C',
    //       error: '#B71C1C',
    //       success: '#4CAf50',
    //       hola: '#00ff00'
    //     }
    //   }
    // }
  },
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      //   'window.jQuery': 'jquery'
      // })
    ],
    extend(config, ctx) {}
  }
}
