module.exports = {
  content: [
    './mobile/**/*.html',       
    './mobile/assets/js/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        defaultBg: "var(--default-bg)",
        tourListBg: "var(--tourlist-bg)",
        articleListBg: "var(--articlelist-bg)",
        articleBg: "var(--article-bg)",
      },
      colors: {
        primary: {
           DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
           DEFAULT: "var(--secondary)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
        specialcolor: {
          1: "var(--special-1)",
          2: "var(--special-2)",
          3: "var(--special-3)",
          4: "var(--special-4)",
       },

      }
    },
  },
  plugins: [],
};

