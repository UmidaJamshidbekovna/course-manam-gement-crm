import { defineConfig } from '#q-app/wrappers'
import { fileURLToPath } from 'node:url'

export default defineConfig((ctx) => {
  return {
    preFetch: true,

    boot: [
      'supabase',
    ],

    css: [
      'app.scss',
      'tailwind.css'
    ],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      vueRouterMode: 'hash',
      vueOptionsAPI: false,

      rebuildCache: true,

      publicPath: '/',
      analyze: true,
      env: {},
      rawDefine: {},
      ignorePublicFolder: true,
      minify: false,
      polyfillModulePreload: true,

      extendViteConf: (viteConf) => {},
      viteVuePluginOptions: {},

      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            compositionOnly: false,
            runtimeOnly: false,
            ssr: ctx.modeName === 'ssr',
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],

        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      https: false,
      open: true
    },

    framework: {
      config: {},

      iconSet: 'material-icons',
      lang: 'en-US',

      components: [],
      directives: [],

      plugins: [],
    },

    animations: 'all',

    sourceFiles: {
      rootComponent: 'src/App.vue',
      router: 'src/router/index',
      store: 'src/store/index',
      pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
      pwaServiceWorker: 'src-pwa/custom-service-worker',
      pwaManifestFile: 'src-pwa/manifest.json',
      electronMain: 'src-electron/electron-main',
      electronPreload: 'src-electron/electron-preload',
      bexManifestFile: 'src-bex/manifest.json',
    },

    ssr: {
      prodPort: 3000,

      middlewares: [
        'render',
      ],

      extendPackageJson: (json) => {},
      extendSSRWebserverConf: (esbuildConf) => {},

      manualStoreSerialization: true,
      manualStoreSsrContextInjection: true,
      manualStoreHydration: true,
      manualPostHydrationTrigger: true,

      pwa: false,
      pwaOfflineHtmlFilename: 'offline.html',

      pwaExtendGenerateSWOptions: (cfg) => {},
      pwaExtendInjectManifestOptions: (cfg) => {}
    },

    pwa: {
      workboxMode: 'GenerateSW',
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      extendManifestJson: (json) => {},
      useCredentialsForManifestTag: true,
      injectPwaMetaTags: false,
      extendPWACustomSWConf: (esbuildConf) => {},
      extendGenerateSWOptions: (cfg) => {},
      extendInjectManifestOptions: (cfg) => {}
    },

    cordova: {
      noIosLegacyBuildFlag: true,
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      extendElectronMainConf: (esbuildConf) => {},
      extendElectronPreloadConf: (esbuildConf) => {},

      extendPackageJson: (json) => {},

      preloadScripts: ['electron-preload'],

      inspectPort: 5858,

      bundler: 'packager',

      packager: {
        appBundleId: '',
        appCategoryType: '',
        osxSign: '',
        protocol: 'myapp://path',
        win32metadata: { }
      },

      builder: {
        appId: 'course-manager-app',
      },
    },

    bex: {
      extendBexScriptsConf: (esbuildConf) => {},
      extendBexManifestJson: (json) => {},

      extraScripts: [],
    },
  }
})
