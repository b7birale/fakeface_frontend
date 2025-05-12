/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      'tiffany_blue': '#94BFBE',
      'midnight_green': '#005668',
      'black': '#000',
      'hard_purple': 'rgb(101, 50, 221)',
      'fun_grey': '#e6e6e6',

      
      'blue': '#1E88E5',
      'lavender': '#9FA8DA',
      'sad_blue': '#3B5998',
      'light_blue': '#E3F2FD',
      //'dark_purple': '#462025',
      //--------------------------
      'fun_purple': '#673AB7',
      'fun_blue': '#2196F3',
      //'fun_grey': '#F5F5F5',
      'dark_grey': '#212121',
      'white': '#FFFFFF'
    }
  },
  plugins: [],
}