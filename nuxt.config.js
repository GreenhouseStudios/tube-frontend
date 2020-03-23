const path = require('path');

let env = require('./config/development.js')

if (process.env.NODE_ENV === 'production') {
    console.log('Loading Prod ENV')
	env = require('./config/production.js')
}

/**
 * Don't completely overwrite the
 * existing env vars.
 */
Object.assign(env, process.env);

module.exports = {
    mode: 'spa',

	/*
	** Headers of the page
	*/
	head: {
		title: 'Sourcery',
		meta: [
            { "http-equiv": "x-ua-compatible", content: "ie=edge" },
            { "name": "viewport", content: "width=device-width, initial-scale=1" }
		],
		link: [
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' },
            { rel: 'icon', type: 'image/png', href: '/icon-256.png' }
        ],
        script: [
            { src: 'https://js.stripe.com/v3/', async: true }
        ]
	},

	/*
	** CSS File
	*/
	css: [
	    '~/assets/styles/sourcery.css',
    ],


	/*
	** Env File
	*/
	env: env,


    /**
	 * PWA Icons
	 * @url https://pwa.nuxtjs.org/modules/icon.html
     */
	icon: {
		iconSrc: 'static/img/sourcery-cauldron.png'
	},

    /**
     * Paths that don't require authentication
     */
    noAuth: [
        '/login',
        '/about',
        '/',
        '/register',
        '/password',
        '/resetpassword',
        '/index-new',
        '/terms',
        '/privacy',
        '/cookies-notice'
    ],

    /**
	 * Meta
	 * @todo Add proper meta for FB and Twitter
	 * @url https://pwa.nuxtjs.org/modules/meta.html
     */
    meta: {
        name: 'Sourcery',
        description: 'Sourcery is a way for scholars around the world to assist each other in the acquisition of non-digitized documents.',
        mobileAppIOS: true
    },


    /**
	 * Workbox
	 * @url https://pwa.nuxtjs.org/modules/workbox.html
     */
    workbox: {

    },

    /**
	 * PWA Manifest
	 * @url https://pwa.nuxtjs.org/modules/manifest.html
     */
    manifest: {
    	name: 'Sourcery',
        short_name: 'Sourcery',
        lang: 'en-US',
        orientation: 'portrait',
        start_url: '/dashboard'
    },


	/*
	** Plugins
	*/
	plugins: [
        // { src: '~/plugins/stripe', mode: 'client' },
        // { src: '~/plugins/user-meta', mode: 'client', ssr: false }
        '~/plugins/firebase-auth.js',
	],


    /**
	 * Customize the loading bar
	 * @url https://nuxtjs.org/api/configuration-loading/
     */
	loading: {
        color: '#654EA3',
		height: '5px'
	},


	/*
	** Router
	*/
	router: {
		middleware: [
            'auth',
            'user-meta',
            'account-type',
            'onboarding-complete'
        ],
    },

    buildModules: [
        ['@nuxtjs/google-analytics', {
            id: 'UA-150639074',
            dev: false, // don't use in dev mode
        }],
        '@nuxtjs/pwa',
        '@nuxtjs/axios',
        '@nuxtjs/toast',
        '@nuxtjs/vuetify',
        'nuxt-webfontloader'
    ],

    /**
     * Settings for @nuxtjs/vuetify
     * @url https://github.com/nuxt-community/vuetify-module/
     */
    vuetify: {
        defaultAssets: {
            icons: 'mdi'
        },
        theme: {
            themes: {
                dark: false,
                light: {
                    primary: '#654EA3',
                    secondary: '#4E4B51',
                    accent: '#53AFAC',
                    error: '#b71c1c'
                }
            }
        },
        customVariables: ['~/assets/styles/variables.scss'],
        treeShake: true
    },

    /**
     * Nuxt Webfont Loader
     */
    webfontloader: {
        google: {
            families: ['Barlow:500,600,700,800']
        }
    },

    /**
     * Nuxt Toasted
     * @url https://github.com/nuxt-community/modules/tree/master/packages/toast#toast
     *
     * Options
     * @url https://github.com/shakee93/vue-toasted
     */
    toast: {
        position: 'top-center',
        duration: 3000,

    },

    /**
	 * Axios
	 * @url https://axios.nuxtjs.org/options.html
     */
    axios: {
        baseURL: env.API_URL
	},

	/*
	** Build configuration
	*/
	build: {
        ssr: false,
        mode: 'spa',


		/*
		** Run ESLint on save
		*/
		extend(config, {isDev, isClient}) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		},

        /**
		 * @link https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
         */
		plugins: [
        ],

		vendor: [
			'axios',
		],
        postcss: {
            plugins: {
                'autoprefixer': {},
            }
        },
        extractCSS: true,
        cssSourceMap: true,

        /**
         * Babel Config
         */
        babel: {
            babelrc: false,
            plugins: (process.env.NODE_ENV === 'production') ? ["transform-remove-console"] : [],
            cacheDirectory: true,
            sourceType: 'unambiguous'
        }
	}
};
