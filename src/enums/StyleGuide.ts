import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ACTIVE_OPACITY = 0.9;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

enum COLORS {
  lightGray = '#F3F6F6',
  lightestGray = '#F2F7FB',
  primary = '#24786D',
  white = '#FFFFFF',
  lightPrimary = '##0FE16D',
  gray = '#797C7B',
  secondary = '#4FA987',
  darkSecondary = '#079049',
  black = '#1E1E1E',
  darkBlack = '#000',
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export {HEIGHT, WIDTH, wp, hp, ACTIVE_OPACITY, COLORS, getRandomColor};
