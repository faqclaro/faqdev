// components/Breadcrumb.js
import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="mdn-Breadcrumb">
      <ul className="mdn-Breadcrumb-list">
        <li className="mdn-Breadcrumb-list-item">
          <a href="/faq/" title='Home' className="mdn-Breadcrumb-link">Home</a>
          <i className="mdn-Breadcrumb-icon mdn-Icon-direita mdn-Icon--md" aria-hidden="true"></i>
        </li>
        {items.map((item, index) => (
          <li key={index} className="mdn-Breadcrumb-list-item">
            <a href={item.url} title={item.name} className="mdn-Breadcrumb-link">{item.name}</a>
            {index < items.length - 1 && (
              <i className="mdn-Breadcrumb-icon mdn-Icon-direita mdn-Icon--md" aria-hidden="true"></i>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;