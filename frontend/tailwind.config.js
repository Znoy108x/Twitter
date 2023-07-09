const { default: plugin } = require("tailwindcss");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blue_purple': "linear-gradient(90deg,#4ca5ff 2.34%,#b673f8 100.78%)",
        "orange_red" : "linear-gradient(90deg,#ff7170 2.34%,#ffe57f 100.78%)" ,
        "green_lime": "linear-gradient(243deg, #3dd875 23%, #0eb3a0 87%)"
      },
      colors:{
        baby_blue : "#4c0ffb",
        baby_gray : "#f7f7fc",
        baby_pink : "#f51767",
        baby_cyan : "#9BF9FF",
        baby_red:"#f14d68d9",
        baby_green:"#15d642d9",
        baby_slate : "#373f49",
        baby_sky:"#f6f6fb",
        baby_light_green:"#32DD88",
        baby_apple : "#f22f46",
        baby_purple:"#5f48ea",
        baby_gradient_purple:"#7b68ee",
        baby_gradient_pink:"#e44ba4",
        baby_gradient_purple_hv : "#5f48ea",
        baby_skyblue : "#dbeafe",
        baby_dark_skyblue : "#1e3a8a",
        baby_dark : "#0D1117",
        baby_blue:"#2190FF",
        glow_pink:"#F59794",
        glow_green:"#D4ED31",
        glow_sky:"#5BD1D7",
        glow_orange:"#e3405f",
        glow_yellow:"#F0BF4C",
        card_gray:"#161b22",
        twitter_blue : "#1aa1f5" ,
        twitter_gray: "#16181c",
        github_green  :"#7ee787",
        github_orange : "#fca089",
        github_purple : "#9299fd"

      },
      fontFamily : {
        "barlow": ['Barlow', 'sans-serif'],
        "inter": ['Inter', 'sans-serif'],
        "nunito": ['Nunito', 'sans-serif'],
        "playfair": ['Playfair Display', 'serif'],
        "ptsherif": ['PT Serif', 'serif'],
        "roboto": ['Roboto', 'sans-serif'],
        "urbanist": ['Urbanist', 'sans-serif'],
        "dancing": ['Dancing Script', 'cursive'],
        "pop": ['Poppins', 'sans-serif'],
        "open_sans": ['Open Sans', 'sans-serif'],
        "archivo" : ['Archivo Black', "sans-serif"],
        "bree" : ['Bree Serif', "serif"],
        "cour" : ['Courgette', "cursive"],
        "gideon" : ['Gideon Roman', "cursive"],
        "great" : ['Great Vibes', "cursive"],
        "kanit" : ['Kanit', "sans-serif"],
        "lobster" : ['Lobster', "cursive"],
        "lora" : ['Lora', "serif"],
        "pacifico" : ['Pacifico', "cursive"],
        "paytone" : ['Paytone One', "sans-serif"],
        "russo" : ['Russo One', "sans-serif"],
        "sourserif" : ['Source Serif Pro', "serif"],
        "josephine": ['Josefin Sans', "sans-serif"]
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
  variants: {
    scrollbar: ['rounded']
  }
}