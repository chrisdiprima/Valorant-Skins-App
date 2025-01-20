/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      pMedium: ["Poppins_500Medium"],
      pRegular: ["Poppins_400Regular"],
      zDots: ["ZenDots_400Regular"],
    },
    extend: {
      colors: {
        highlighted: "#073F37",
        highlighted2: "#019C81",
        lightText: "#708687",
        primary: "#031314",
        layer1: "#062628",
      },
    },
  },
  plugins: [],
};
