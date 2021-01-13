import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  label: PropTypes.string,
});

export const formValues = PropTypes.shape({
  label: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
