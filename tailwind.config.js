module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    extend: {
      backgroundImage: {
        cloudy: "url('/src/assets/img/cloudy.jpg')",
        drizzle: "url('/src/assets/img/drizzle.jpg')",
        haze: "url('/src/assets/img/haze.jpg')",
        rain: "url('/src/assets/img/rain.jpg')",
        snow: "url('/src/assets/img/snow.jpg')",
        sunny: "url('/src/assets/img/sunny.jpg')",
        ash: "url('/src/assets/img/ash.jpg')",
        tornado: "url('/src/assets/img/tornado.jpg')",
        smoke: "url('/src/assets/img/smoke.jpg')",
        mist: "url('/src/assets/img/mist.jpg')",
        dust: "url('/src/assets/img/dust.jpg')",
        thunderstorm: "url('/src/assets/img/thunderstorm.jpg')",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "translate(3px, 0)",
          },
          "50%": {
            transform: "translate(-3px, 0)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
      },
      animation: {
        shake: "shake 150ms 2 linear",
      },
    },
  },
  plugins: [],
};
