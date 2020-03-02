require("dotenv").config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Dosis|Montserrat&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["./assets/main.css", "./assets/utilities.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vue-datepicker.js", ssr: false }],

  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },

  server: {
    port: 8081, // par défaut: 3000
    host: "0.0.0.0" // par défaut: localhost
  },

  watchers: {
    webpack: {
      poll: true
    }
  },

  modules: ["@nuxtjs/axios", "nuxt-socket-io"],

  io: {
    sockets: [
      {
        name: "home",
        url: "http://localhost:5000",
        default: true,
        vuex: {
          // optional
          mutations: [{ message: "SET_STATUS" }]
        }
      }
    ]
  },

  axios: {
    host: "http://172.23.0.3",
    port: 3000
  }
};
