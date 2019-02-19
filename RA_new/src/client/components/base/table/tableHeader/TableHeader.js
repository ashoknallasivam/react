// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';

const TableHeader = ({
  children,
  theadClass,
  trClass
}) => (
  <thead className={theadClass?theadClass:""}>
    <tr className={trClass?trClass:""}>
      {children}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  theadClass: PropTypes.string,
  trClass: PropTypes.string
};

export default TableHeader;
