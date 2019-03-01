// @flow weak

import React   from 'react';
import PropTypes  from 'prop-types';

const TableBody = ({
  children,
  tbodyClass
}) => (
  <tbody className={tbodyClass?tbodyClass:""}>
    {children}
  </tbody>
);

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
  tbodyClass: PropTypes.string
};

export default TableBody;
