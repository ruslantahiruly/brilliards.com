const axios = require('axios');

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Orbitron',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
      },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/main.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/buefy.js',
    '~/plugins/gtag.js',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-fontawesome',
    'cookie-universal-nuxt',
    '@nuxtjs/sitemap',
  ],
  styleResources: {
    scss: ['~/assets/sass/vars.scss'],
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faLocationArrow', 'faMapMarkerAlt', 'faWifi', 'faTv', 'faUtensils', 'faGlassWhiskey', 'faUserShield', 'faSmoking', 'faFan', 'faRestroom', 'faParking', 'faHatCowboy', 'faPhoneAlt', 'faClock', 'faArrowUp', 'faAngleLeft', 'faAngleRight', 'faGlobe', 'faBookOpen', 'faWallet', 'faCreditCard']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['faInstagram', 'faVk', 'faFacebookF', 'faOdnoklassniki', 'faYoutube']
      }
    ]
  },
  axios: {
    baseURL: process.env.BASE_URL,
  },
  sitemap: {
    hostname: 'https://brilliards.com',
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
    },
    exclude: [
      '/about',
    ],
    routes: async () => {
      const { data } = await axios.get(`${process.env.BASE_URL}/sitemap-clubs/`);
      return data.map((club) => `/${club.city.url}/clubs/${club.slug}/`);
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  /*
  ** Loading progress bar
  */
  loading: { 
    color: '#f00',
  },
  router: {
    prefetchLinks: false,
  },
}
