/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",], theme: {
        extend: {
            colors: {
                'regal-blue': '#243c5a', 'paper-white': '#ffffff', 'paper-black': '#020a17'
            }, fontFamily: {
                'paragraph': ['Nixie One', 'cursive'],
                'paper': ['Inconsolata', 'monospace'],
                'cursive': ['Sacramento', 'cursive'],
            }, keyframes: {
                'swing': {
                    '0%': {transform: 'rotate(13deg)'}, '100%': {transform: 'rotate(-13deg)'},
                }, 'vertical': {
                    '0%': {transform: 'translateY(-260vh)'},
                    '100%': {transform: 'translateY(80vh)'},
                },
                skew:{
                    '0%': {transform: 'skewY(0deg)'},
                    '100%': {transform: 'skewY(10deg)'},
                }
            }, animation: {
                'swing': 'swing 1s ease-in-out alternate infinite',
                'vertical': 'vertical 240s ease-in-out alternate infinite ',
                'skew': 'skew 1s ease-in-out alternate infinite',
            },

            plugins: [],
        }
    }
}
