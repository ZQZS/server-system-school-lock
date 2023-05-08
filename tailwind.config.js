// eslint-disable-next-line no-undef
const scrollbarHide = require("tailwind-scrollbar-hide");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#009a61" },
      transitionProperty: {
        'height': 'height',
      }
    },
    variants: {
      extend: {
        transitionDuration: ["hover", "focus"],
        backgroundColor: ["checked"],
        borderColor: ["checked"]
      }
    }
  },
  plugins: [scrollbarHide]
};
