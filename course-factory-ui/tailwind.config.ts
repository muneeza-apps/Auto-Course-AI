import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#7F77DD',
          light: '#EEEDFE',
          dark: '#3C3489',
          50: '#EEEDFE',
          100: '#CECBF6',
          500: '#7F77DD',
          700: '#534AB7',
          900: '#26215C',
        },
        green: {
          brand: '#1D9E75',
          light: '#E1F5EE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
