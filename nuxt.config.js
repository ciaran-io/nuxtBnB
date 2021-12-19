import { resolve } from 'path'

export default {
  alias: {
    images: resolve(__dirname, './assets/images/'),
    icons: resolve(__dirname, './assets/images/icons/'),
  },

  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId:
        '515343809034-q2tgor76qnhc8dkdcau7na1trvn2udum.apps.googleusercontent.com',
    },
    algolia: {
      appId: '20TT3H3J0T',
      key: 'a2ab745a479ac514dd5769f72997579d',
    },
    cloudinary: {
      apiKey: '393381988898356'
    }
  },

  privateRuntimeConfig: {
    algolia: {
      appId: '20TT3H3J0T',
      key: '7a77605478934aca82ac224fdeccb922',
    },
    cloudinary: { 
      apiSecret: 'TZIayhw_McP_tKOkHRSvt6ZM1NI'
    },
  },

  cloudinary: {
    cloudName: 'pixlink',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'mastering-nuxt: %s',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataApi',
    '~/plugins/auth.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/homes', '~/components/buttons'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    // 'nuxt-vite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '~/modules/auth',
    '~/modules/algolia',
    '~/modules/cloudinary',
    '@nuxtjs/cloudinary'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    loaders: {
      imgUrl: { limit: 0 },
    },
  },

  tailwindcss: {
    viewer: false,
  },

 
}
