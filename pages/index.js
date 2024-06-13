// pages/index.js
import Head from 'next/head';
import Storyblok from '../storyblok-config';
import Banner from '../components/Banner';
import Grid from '../components/Grid';
import SearchBar from '../components/SearchBar';
import Accordion from '../components/Accordion';
import Header from '../components/Header';
import Script from "next/script";

export default function Home({ pageContent, globalLinksMenu }) {
  
  const { title, title_2, Banner: bannerArray, grid: gridArray, searchPlaceholder, accordionItems, metaRobots } = pageContent;
  
  // Renderização condicional do banner
  const bannerHero = bannerArray?.length ? <Banner banner={bannerArray[0]} /> : null;
  const { seoTags } = pageContent;

  // Em vez de acessar diretamente, use o operador de encadeamento opcional e fallbacks
  const metaTitle = seoTags?.MetaTitle || 'Título Padrão';
  const metaDescription = seoTags?.MetaDescription || 'Descrição Padrão';
  const canonicalUrl = seoTags?.CanonicalURL || 'URL Padrão';

  // O conteúdo do Acordeão precisa ser extraído corretamente, mas parece que você já fez isso
  const accordionContent = pageContent.Accordion;

  return (
    <main>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content={metaRobots || 'index,follow'}/>
        <meta property="og:title" content={metaTitle}/>
        <meta property="og:description" content={metaDescription}/>
        <meta property="og:image" content="https://a.storyblok.com/f/283011/80x80/4166c5cc1b/claro-faq.webp"/>
        <meta property="og:type" content="FAQ"/>
        <meta property="og:url" content={canonicalUrl}/>
      </Head>
      <Script
        src="https://plugin.handtalk.me/web/latest/handtalk.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          var ht = new HT({
            avatar: "MAYA",
            align: "top",
            side: "right",
            token: "7980f66fc04e8a51e244928880939142"
          });
        }}
      />
      <Header {...globalLinksMenu}/>
      {bannerHero}
      <div className="mdn-Container">
        <div className="mdn-Row">
          <div className="mdn-Col-xs mdn-u-padding--sm mdn-u-marginTop--xxxs">
            <SearchBar placeholder={searchPlaceholder || "Digite sua busca"} />
          </div>
        </div>
        <div className="mdn-Row">
          <div className="mdn-Col-xs mdn-u-padding--xs mdn-u-marginTop--xxxs">
            <h2 className="mdn-Heading mdn-Heading--sm">{title}</h2>
          </div>
        </div>
        {gridArray && gridArray.length > 0 && (
          <div className="mdn-Row">
            <div className="mdn-Col-xs mdn-u-padding--xs">
              <Grid gridData={gridArray} />
            </div>
          </div>
        )}
        <div className="mdn-Row">
          <div className="mdn-Col-xs mdn-u-padding--xs mdn-u-marginTop--xxxs">
            <h2 className="mdn-Heading mdn-Heading--sm">{title_2}</h2>
          </div>
        </div>
        <div className="mdn-Row">
          <div className="mdn-Col-xs mdn-u-padding--xs mdn-u-marginTop--xxxs">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  let pageContent = {};
  
  try {
    const res = await Storyblok.get(`cdn/stories/home`, {
      // version: 'draft',
    });

    pageContent = res.data.story.content || {}; // Assegure que o conteúdo não é undefined
    const seoData = pageContent.seo?.[0] || {};

    pageContent.seoTags = {
      MetaTitle: seoData.MetaTitle || 'Título Padrão',
      MetaDescription: seoData.MetaDescription || 'Descrição Padrão',
      CanonicalURL: seoData.CanonicalURL || 'URL Padrão',
    };
    
    pageContent.accordionItems = pageContent.Accordion || [];
  } catch (error) {
    console.error("Error fetching page content:", error);
    pageContent.seoTags = {
      MetaTitle: 'Título Padrão',
      MetaDescription: 'Descrição Padrão',
      CanonicalURL: 'URL Padrão',
    };
    pageContent.accordionItems = [];
  }

  let globalLinksMenu = [];
  const resCategories = await Storyblok.get('cdn/stories/global/globallinkscategorias', {
    // version: 'draft',
  });
  const globalLinksReceived = await resCategories.data.story.content.accordion || {};

  function resto(params) {
    return params.AccordionMenu.map((item) => item)
  }
  
  globalLinksMenu.push( await globalLinksReceived.map((item) => ({
    'title': item.title,
    'content': resto(item)
  })))

  return {
    props: { pageContent, globalLinksMenu },
    revalidate: 60,
  };
}

