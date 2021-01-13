import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string.isRequired,
  birth: PropTypes.string,
});

export const formValues = PropTypes.shape({
  name: PropTypes.string,
  birth: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
});

export const formTouched = PropTypes.shape({
  name: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  birth: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  birth: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
