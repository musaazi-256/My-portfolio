import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './data/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2B2D30',
        muted: '#6F7175',
        paper: '#EDEDED',
        brand: '#EC7200',
        'brand-dark': '#C85F00',
        'brand-light': '#FF9B32',
        accent: '#111111'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(28, 28, 28, 0.08)',
        glass: '0 22px 70px rgba(28, 28, 28, 0.12)',
        glow: '0 18px 45px rgba(236, 114, 0, 0.26)'
      }
    }
  },
  plugins: []
}
export default config
