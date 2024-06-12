import React from 'react';
import { Link, Button } from 'mondrian-react';
import Storyblok from '../storyblok-config';

const Custom404 = ({ page }) => {
  if (!page) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Página Não Encontrada</h1>
        <p>Desculpe, não conseguimos encontrar a página que você está procurando.</p>
        <Link href="/">
          <Button primary>Voltar para a Home</Button>
        </Link>
      </div>
    );
  }

  const { title, message, button_label, button_url } = page.content;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '100px' }}>
      <h1>{title}</h1>
      <p>{message}</p>
      <p><br></br></p>
        <Link href="/faq/">
          <Button primary>Voltar para a Home</Button>
        </Link>
    </div>
  );
};

export async function getStaticProps() {
  const slug = "page404";
  try {
    const res = await Storyblok.get(`cdn/stories/${slug}`, {
      version: "draft" // ou "published", dependendo do seu ambiente
    });

    return {
      props: {
        page: res.data.story || null,
      },
      revalidate: 10, // Intervalo para revalidação da página
    };
  } catch (error) {
    console.error('Error fetching the 404 page:', error);
    // Fallback para conteúdo genérico se houver um erro
    return {
      props: { page: null },
    };
  }
};

export default Custom404;
