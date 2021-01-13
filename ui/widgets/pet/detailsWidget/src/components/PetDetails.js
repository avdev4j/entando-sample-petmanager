import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import petType from 'components/__types__/pet';
import PetFieldTable from 'components/pet-field-table/PetFieldTable';

const PetDetails = ({ t, pet }) => {
  return (
    <Box>
      <h3>
        {t('common.widgetName', {
          widgetNamePlaceholder: 'Pet',
        })}
      </h3>
      <PetFieldTable pet={pet} />
    </Box>
  );
};

PetDetails.propTypes = {
  pet: petType,
  t: PropTypes.func.isRequired,
};

PetDetails.defaultProps = {
  pet: {},
};

export default withTranslation()(PetDetails);
