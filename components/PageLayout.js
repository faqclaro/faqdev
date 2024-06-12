// components/PageLayout.js
import Head from 'next/head';
import Banner from './Banner';
import Grid from './Grid';
import SearchBar from './SearchBar';
import Accordion from './Accordion';

const PageLayout = ({ pageContent }) => {
  const { title, title_2, Banner: bannerArray, grid: gridArray, searchPlaceholder, accordionItems, seoTags } = pageContent;

  // Renderização condicional do banner
  const bannerHero = bannerArray?.length ? <Banner banner={bannerArray[0]} /> : null;

  const metaTitle = seoTags?.MetaTitle || 'Título Padrão';
  const metaDescription = seoTags?.MetaDescription || 'Descrição Padrão';
  const canonicalUrl = seoTags?.CanonicalURL || 'URL Padrão';

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
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
    </>
  );
};

export default PageLayout;