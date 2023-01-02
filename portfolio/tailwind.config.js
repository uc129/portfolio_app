/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'paper-white': '#ffffff',
        'paper-black': '#020a17'
      },
      fontFamily: {
        'sans': ['Arial', 'monospace'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['Paper', 'monospace', 'SFMono-Regular'],
        'display': ['Oswald'],
        'body': ['"Open Sans"']
      },
      animation: {
        'wavy-slow': 'wavy 3s linear infinite',
      },
      keyframes: {
        wavy: {
          '0%, 100%': {transform: 'translate(10px)'},
          '50%': {transform: 'translate(-10px)'},
        },
        backgroundImage: {
          'img1': "url('/public/assets/art/Asset 1.svg')",
          'img2': "url('/public/assets/art/Asset 4.svg')",
          'img3': "url('/public/assets/art/Asset 11.svg')",
          'img4': "url('/public/assets/art/AyodhyaKing.svg')",
          'img5': "url('/public/assets/art/Chief of Raghu.svg')",
          'img6': "url('/public/assets/art/Dashratha.svg')",
          'img7': "url('/public/assets/art/DevakiKrishna.svg')",
          'img8': "url('/public/assets/art/Devaki Krishna2.svg')",
          'img9': "url('/public/assets/art/HindutvaIcon.svg')",
          'img10': "url('/public/assets/art/Kaali.svg')",
          'img11': "url('/public/assets/art/Krishnagopal.svg')",
          'img12': "url('/public/assets/art/KrishnaMortar.svg')",

        }
      },
    },
    plugins: [],
  }
}
