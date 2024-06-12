import React from 'react';

const Shortcut = ({ shortcutData }) => {
  // A propriedade icon agora é uma string com a classe do ícone
  // A propriedade title é o texto do atalho
  // A propriedade link é a URL do atalho

  // Aqui você define a classe base e adiciona a classe do ícone do objeto shortcutData
  const iconClass = `mdn-Shortcut-icon ${shortcutData.icon}`;

  return (
    <a href={shortcutData.link.url} className="mdn-Shortcut mdn-Shortcut--secondary">
      <i aria-hidden="true" className={iconClass}></i>
      <p className="mdn-Shortcut-text">{shortcutData.title}</p>
    </a>
  );
};

export default Shortcut;