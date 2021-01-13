import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import petType from 'components/__types__/pet';

const PetFieldTable = ({ t, i18n: { language }, pet }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{t('common.name')}</TableCell>
        <TableCell>{t('common.value')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <span>{t('entities.pet.id')}</span>
        </TableCell>
        <TableCell>
          <span>{pet.id}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.pet.name')}</span>
        </TableCell>
        <TableCell>
          <span>{pet.name}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.pet.birth')}</span>
        </TableCell>
        <TableCell>
          <span>{pet.birth && new Date(pet.birth).toLocaleString(language)}</span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

PetFieldTable.propTypes = {
  pet: petType,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

PetFieldTable.defaultProps = {
  pet: [],
};

export default withTranslation()(PetFieldTable);
