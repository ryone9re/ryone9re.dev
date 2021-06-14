import axios from 'axios'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ryone9re',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, height=device-height,initial-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/day.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
        ],
      },
    ],
    [
      'nuxt-webfontloader',
      {
        webfontloader: {
          google: {
            families: [
              'Lato:400,700',
              'Noto+Sans+JP:400,700',
              'Noto+Serif+JP:400,700',
            ],
          },
        },
      },
    ],
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    apiUrl: process.env.apiUrl,
    apiKey: process.env.apiKey,
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://ryone9re.link',
    routes(callback) {
      axios
        .get(`${process.env.apiUrl}?limit=100`, {
          headers: { 'X-API-KEY': process.env.apiKey },
        })
        .then((res) => {
          const routes = res.data.contents.map((news) => {
            return '/news/' + news.id
          })
          callback(null, routes)
        })
        .catch(callback)
    },
  },
}
