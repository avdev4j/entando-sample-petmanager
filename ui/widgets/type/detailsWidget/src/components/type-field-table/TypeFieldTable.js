import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import typeType from 'components/__types__/type';

const TypeFieldTable = ({ t, type }) => (
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
          <span>{t('entities.type.id')}</span>
        </TableCell>
        <TableCell>
          <span>{type.id}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.type.label')}</span>
        </TableCell>
        <TableCell>
          <span>{type.label}</span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

TypeFieldTable.propTypes = {
  type: typeType,
  t: PropTypes.func.isRequired,
};

TypeFieldTable.defaultProps = {
  type: [],
};

export default withTranslation()(TypeFieldTable);
