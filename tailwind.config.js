/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Roboto', 'sans-serif']
      },
      maxHeight: {
        'img-lg': '24rem',
        'img-md': '18rem',
        'img-sm': '11.5rem'
      },

      colors: {
        //violet
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        },

        // //blue
        // primary: {
        //   50: '#eff6ff',
        //   100: '#dbeafe',
        //   200: '#bfdbfe',
        //   300: '#93c5fd',
        //   400: '#60a5fa',
        //   500: '#3b82f6',
        //   600: '#2563eb',
        //   700: '#1d4ed8',
        //   800: '#1e40af',
        //   900: '#1e3a8a',
        //   950: '#172554'
        // },
        secondary: '#6F49FD',
        text1: '#1f2937',
        text2: '#4b5563',
        text3: '#6b7280',
        text4: '#6b7280',
        text5: '#9ca3af',
        text6: '#d1d5db',
        text7: '#f3f4f6',
        text8: '#f9fafb',
        'icon-color': '#A2A2A8',
        whiteSoft: '#FCFBFF',
        graySoft: '#FCFCFC',
        grayf3: '#f3f3f3',
        strock: '#F1F1F3',
        lite: '#FCFCFD',
        error: '#EB5757',
        darkbg: '#111529',
        darkbg2: '#16192a',
        darkbg3: '#1a1d2f',
        softDark: '#22222C',
        darkSoft: '#24242C',
        darkStroke: '#3A3A43',
        darkRed: '#422C32'
      },
      boxShadow: {
        sdprimary: '10px 10px 20px rgba(211, 211, 211, 0.25)'
      },
      backgroundImage: {
        //Red to yellow
        // 'gradient-primary': 'linear-gradient(to right, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))',

        //SUBLIME
        'gradient-primary': 'linear-gradient(to right, rgb(251, 113, 133), rgb(217, 70, 239), rgb(99, 102, 241))',
        'gradient-hover-primary':
          'linear-gradient(to left bottom, rgb(251, 113, 133), rgb(217, 70, 239), rgb(99, 102, 241))',

        'gradient-secondary': 'linear-gradient(to right, rgb(147, 51, 234),rgb(134, 239, 172), rgb(59, 130, 246))',
        'gradient-hover-secondary':
          'linear-gradient(to left bottom, rgb(147, 51, 234),rgb(134, 239, 172), rgb(59, 130, 246))'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
