// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';

const TableRow = ({
  children,
  trClass
}) => (
  <tr className={trClass?trClass:""}>
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  trClass: PropTypes.string
};

export default TableRow;
