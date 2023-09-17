module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    extend: {
      colors: {
        primary: "#0088ff",
      },
      backgroundImage: {
        cloudy: "url('/src/assets/img/cloudy-low.png')",
        drizzle: "url('/src/assets/img/drizzle-low.png')",
        haze: "url('/src/assets/img/haze-low.png')",
        rain: "url('/src/assets/img/rain-low.png')",
        snow: "url('/src/assets/img/snow-low.png')",
        sunny: "url('/src/assets/img/sunny-low.png')",
        ash: "url('/src/assets/img/ash-low.png')",
        tornado: "url('/src/assets/img/tornado-low.png')",
        smoke: "url('/src/assets/img/smoke-low.png')",
        mist: "url('/src/assets/img/mist-low.png')",
        dust: "url('/src/assets/img/dust-low.png')",
        fog: "url('/src/assets/img/fog-low.png')",
        thunderstorm: "url('/src/assets/img/thunderstorm-low.png')",
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
