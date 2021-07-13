export const colors = {
  default: '#39A9CB',
  disable: '#A5B1C2',
  dark: '#474747',
  danger: '#D83A56', 
  success: '#66DE93',
  warning: '#FFB037', 
  info: '#7DEDFF',
  text: {
    default: '#7e7e7e',
  },
  random: () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
};
