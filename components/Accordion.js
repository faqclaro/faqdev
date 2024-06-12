import React from 'react';
import { Accordion as MondrianAccordion } from 'mondrian-react';
import AccordionItem from './AccordionItem';

const Accordion = ({ items }) => {
  console.log('Accordion items:', items); // Isso deve mostrar os itens do acordeão no console

  if (!items) {
    // Retorne null ou algum fallback se items for undefined
    return null;
  }

  const accordionItems = items.map((item, index) => ({
    title: item.title,
    content: (
      <AccordionItem
        key={item._uid}
        title={item.title}
        content={item.content}
      />
    ),
  }));

  return <MondrianAccordion data={accordionItems} />;
};

export default Accordion;
