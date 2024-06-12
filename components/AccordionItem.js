import React from 'react';
import { Link } from 'mondrian-react';

const AccordionItem = ({ content }) => {
  const renderRichText = (richTextContent) => {
    if (!Array.isArray(richTextContent)) {
      console.error('O conteúdo do texto rico deve ser um array.', richTextContent);
      return null;
    }

    return richTextContent.map((block, index) => {
      if (!block || !block.type || !block.content) {
        console.error('Bloco richtext malformado:', block);
        return null;
      }

      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index}>
              {block.content.map((textElement, idx) => renderTextElement(textElement, idx))}
            </p>
          );

        case 'heading':
          const HeadingTag = `h${block.attrs.level}`;
          return (
            <HeadingTag key={index}>
              {block.content.map((textElement, idx) => renderTextElement(textElement, idx))}
            </HeadingTag>
          );

        case 'bullet_list':
          return (
            <ul key={index}>
              {block.content.map((listItem, idx) => (
                <li key={idx}>
                  {listItem.content.map((textElement, idx2) => renderTextElement(textElement, idx2))}
                </li>
              ))}
            </ul>
          );

        case 'ordered_list':
          return (
            <ol key={index}>
              {block.content.map((listItem, idx) => (
                <li key={idx}>
                  {listItem.content.map((textElement, idx2) => renderTextElement(textElement, idx2))}
                </li>
              ))}
            </ol>
          );

        default:
          console.warn('Tipo de bloco não suportado:', block.type);
          return null;
      }
    });
  };

  const renderTextElement = (textElement, idx) => {
    if (!textElement) return null;

    const styles = getStyle(textElement.marks);

    switch (textElement.type) {
      case 'text':
        if (textElement.marks && textElement.marks.some(mark => mark.type === 'link')) {
          const linkMark = textElement.marks.find(mark => mark.type === 'link');
          return (
            <Link key={idx} href={linkMark.attrs.href} target={linkMark.attrs.target || '_self'} style={{ ...styles, textDecoration: 'underline' }}>
              {textElement.text}
            </Link>
          );
        }
        return (
          <span key={idx} style={styles}>
            {textElement.text}
          </span>
        );

      case 'hard_break':
        return <br key={idx} />;
      
      default:
        console.error('Tipo de elemento de texto não suportado:', textElement.type);
        return null;
    }
  };

  const getStyle = (marks) => {
    if (!marks) return {};
    const styles = {};
    marks.forEach(mark => {
      switch (mark.type) {
        case 'bold':
          styles.fontWeight = 'bold';
          break;
        case 'italic':
          styles.fontStyle = 'italic';
          break;
        case 'underline':
          styles.textDecoration = 'underline';
          break;
        case 'textStyle':
          if (mark.attrs && mark.attrs.color) {
            styles.color = mark.attrs.color;
          }
          break;
        default:
          console.warn('Tipo de marcação não suportado:', mark.type);
      }
    });
    return styles;
  };

  return (
    <div>
      <div>{content && content.content && renderRichText(content.content)}</div>
    </div>
  );
};

export default AccordionItem;