import PropTypes from 'prop-types';

const petType = PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string,
  birth: PropTypes.string,
});

export default petType;
