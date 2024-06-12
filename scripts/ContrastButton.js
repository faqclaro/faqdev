import React from 'react';
import { useTheme } from 'mondrian-react';

const ContrastButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <button className="mdn-Menu-top-event mdn-Menu-top-contrast-action" title="Opção de acessibilidade. Clique para alterar o contraste do Portal" onClick={toggleTheme}>
      <span className="mdn-Icon-alto-contraste mdn-Icon--sm" aria-hidden="true"></span>
    </button>
  );
};

export default ContrastButton;
