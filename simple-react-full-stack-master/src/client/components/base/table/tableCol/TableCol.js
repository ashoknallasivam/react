// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';

const TableCol = ({
  children,
  tdClass
}) => (
  <td className={tdClass?tdClass:""}>
    {children}
  </td>
);

TableCol.propTypes = {
  children: PropTypes.node.isRequired,
  tdClass: PropTypes.string
};

export default TableCol;
