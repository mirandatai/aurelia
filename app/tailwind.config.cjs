/********************
 Tailwind Config - Aurélia
********************/
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F2EFD8',
        gold: '#C8A20A',
        wine: '#6F2331',
        blush: '#EFC9CF',
        olive: '#7A8526',
        ink: '#3B2A2A',
        inkMuted: '#7A6A66'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Crimson Text"', 'serif']
      },
      borderRadius: {
        mdx: '12px',
        lgx: '16px'
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.10)'
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      transitionDuration: {
        soft: '200ms',
        micro: '140ms'
      }
    }
  },
  plugins: []
}
