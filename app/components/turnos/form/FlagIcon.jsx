import React from 'react';
import Flag from 'react-flags-select';

const FlagIcon = ({ code }) => {
  return (
    <Flag
      selected={code}
      showSelectedLabel={false}
      countries={['AR', 'BR', 'CL', 'PY', 'UY']}
      customLabels={{
        AR: 'Argentina',
        BR: 'Brasil',
        CL: 'Chile',
        PY: 'Paraguay',
        UY: 'Uruguay',
      }}
      searchable={false}
      className="flag-icon"
    />
  );
};

export default FlagIcon;