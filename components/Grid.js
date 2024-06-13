// components/Grid.js
import React from 'react';
import Shortcut from './Shortcut';

const Grid = ({ gridData }) => {
    return (
      <div className="flex gap-x-3 gap-y-2 flex-wrap">
        {gridData.map((shortcutData) => (
          <div key={shortcutData._uid}>
            <Shortcut shortcutData={shortcutData} />
          </div>
        ))}
      </div>
    );
};

export default Grid;
