/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      pMedium: ["Poppins_500Medium"],
      pRegular: ["Poppins_400Regular"],
      zDots: ["ZenDots_400Regular"],
    },
    extend: {
      colors: {
        highlightedBlue: "#073F37",
        ligtText: "#708687",
      },
    },
  },
  plugins: [],
};
