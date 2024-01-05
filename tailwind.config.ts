import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "545px",
        nbt:{"min":"0px","max":"414px"},
        nb:{"min":"865px","max":"100vw"},
      },
      maxWidth: {
        column: "200px", // Adjust the width as per your needs
      },
      backgroundImage: {
        heroFirstBgImage:
          "linear-gradient(rgba(254, 254, 254, 1) 2px, rgba(64, 123, 255, 1) 5px",
      },
    },
  },
  plugins: [],
};
export default config;
