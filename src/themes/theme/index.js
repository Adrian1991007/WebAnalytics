import PropTypes from 'prop-types';

import Default from './default';

const Theme = (colors, presetColor) => {
  switch (presetColor) {
    default:
      return Default(colors);
  }
};

Theme.propTypes = {
  colors: PropTypes.object,
  presetColor: PropTypes.any
};

export default Theme;
