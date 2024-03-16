/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NanumSquareNeo-Variable', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '2xl': '1600px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),
  plugin(({addVariant}) => {
    addVariant('prose-inline-code',
    '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))'
    )
  })
],
}
