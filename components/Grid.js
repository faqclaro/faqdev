// components/Grid.js
import React from 'react';
import Shortcut from './Shortcut';

const Grid = ({ gridData }) => {
    return (
      <div className="mdn-Container">
        <div className="mdn-Row">
          {gridData.map((shortcutData) => (
            <div key={shortcutData._uid} className="mdn-Col-xs mdn-u-padding--xs mdn-u-marginTop--xxxs">
              <Shortcut shortcutData={shortcutData} />
            </div>
          ))}
        </div>
      </div>
    );
};

export default Grid;
