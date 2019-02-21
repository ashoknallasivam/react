// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';

const Table = ({
  children,
  tableClass
}) => (
  <table className={tableClass?tableClass:""}>
    {children}
  </table>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
  tableClass:PropTypes.string
};

export default Table;
