import React from 'react';
import { Accordion } from 'mondrian-react';
import { LinkList } from 'mondrian-react';

const AccordionCategory = ({ title, menu }) => {
  const linkListData = menu.map(item => ({
    title: item.title,
    href: item.url
  }));

  const accordionContent = (
    <LinkList data={linkListData} />
  );

  return (
    
      <Accordion
        onlyChild
        data={[
          {
            title,
            content: accordionContent
          }
        ]}
      />
    
  );
};

export default AccordionCategory;
