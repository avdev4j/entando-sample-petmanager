import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import typeType from 'components/__types__/type';
import TypeFieldTable from 'components/type-field-table/TypeFieldTable';

const TypeDetails = ({ t, type }) => {
  return (
    <Box>
      <h3>
        {t('common.widgetName', {
          widgetNamePlaceholder: 'Type',
        })}
      </h3>
      <TypeFieldTable type={type} />
    </Box>
  );
};

TypeDetails.propTypes = {
  type: typeType,
  t: PropTypes.func.isRequired,
};

TypeDetails.defaultProps = {
  type: {},
};

export default withTranslation()(TypeDetails);
