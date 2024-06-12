// pages/[...slug].js
import React from 'react';
import Head from 'next/head';
import Storyblok from '../storyblok-config';
import Banner from '../components/Banner';
import Grid from '../components/Grid';
import SearchBar from '../components/SearchBar';
import Accordion from '../components/Accordion';
import Breadcrumb from '../components/Breadcrumb';
import { render } from 'storyblok-rich-text-react-renderer';
import AccordionCategory from '../components/AccordionCategory';
import { Heading, Text, Link } from 'mondrian-react';

const headingResolver = (children, { level }) => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const size = sizes[level - 1] || 'md';
  return <Heading {...{ [size]: true }}>{children}</Heading>;
};

const NODE_TYPES = {
  PARAGRAPH: 'paragraph',
  HEADING: 'heading',
  LINK: 'link',
};

const paragraphResolver = (children) => <Text body>{children}</Text>;

const renderOptions = {
  nodeResolvers: {
    [NODE_TYPES.HEADING]: headingResolver,
    [NODE_TYPES.PARAGRAPH]: paragraphResolver,
  },
  markResolvers: {
    [NODE_TYPES.LINK]: (children, { href, target }) => (
      <Link href={href} target={target}>
        {children}
      </Link>
    ),
  },
};

const HomeDynamic = ({ pageContent, metaTitle, metaDescription, canonicalUrl, breadcrumb }) => {
  console.log('HomeDynamic Page Content:', pageContent);

  if (!pageContent) {
    return <p>Loading...</p>;
  }

  const { title, title_2, Banner: bannerArray, grid: gridArray, searchPlaceholder, Accordion: accordionItems } = pageContent;

  const bannerHero = bannerArray?.length ? <Banner banner={bannerArray[0]} /> : null;

  console.log('Accordion items:', accordionItems);

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
            <SearchBar placeholder={searchPlaceholder || 'Digite sua busca'} />
          </div>
        </div>
        <div className="mdn-Row">
          <div className="mdn-Col-xs mdn-u-padding--xs mdn-u-marginTop--xxxs">
            <Breadcrumb items={breadcrumb} />
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
        {accordionItems && accordionItems.length > 0 && (
          <div className="mdn-Row">
            <div className="mdn-Col-xs mdn-u-padding--xs mdn-u-marginTop--xxxs">
              <Accordion items={accordionItems} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const CategoryPage = ({ articleContent, breadcrumb, accordion, metaTitle, metaDescription, canonicalUrl }) => {
  if (!articleContent || !articleContent.content) {
    return <p>Loading...</p>;
  }

  const htmlContent = render(articleContent.content, renderOptions);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <div className="mdn-Container">
        <div className="mdn-Row">
          <div className="mdn-Col-xs mdn-u-padding--xs mdn-u-marginTop--xxxs">
            <SearchBar />
          </div>
        </div>
        <div className="mdn-Row">
          <div className="mdn-Col-xs mdn-u-marginTop--xxxs">
            <Breadcrumb items={breadcrumb} />
          </div>
        </div>
        <div className="mdn-Row mdn-u-padding--sm">
          <div className="mdn-Col-xs-12 mdn-Col-md-4">
            {accordion.length > 0 ? accordion.map((acc, index) => (
              <AccordionCategory key={index} title={acc.title} menu={acc.menu} />
            )) : <p>No accordion data available.</p>}
          </div>
          <div className="mdn-Col-xs">
            <h2 className="mdn-Heading mdn-Heading--sm">{articleContent.title}</h2><br></br>
            <div>{htmlContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join('/') : '';

  console.log('Slug:', slug);

  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;

  const extractText = (richText) => {
    if (!richText || !richText.content) {
      return '';
    }

    const extract = (nodes) => {
      let textContent = '';

      nodes.forEach((node) => {
        if (node.type === 'text') {
          textContent += node.text;
        } else if (node.content && Array.isArray(node.content)) {
          textContent += extract(node.content);
        }
      });

      return textContent;
    };

    return extract(richText.content).substring(0, 160).trim();
  };

  try {
    const res = await Storyblok.get(`cdn/stories/${slug}`, {
      version: 'draft',
      resolve_relations: 'CategoryPage.accordion',
    });

    console.log('Storyblok API Response:', res.data);

    if (!res.data.story) {
      return { notFound: true };
    }

    const articleContent = res.data.story;
    const breadcrumbItems = params.slug.map((slugPart, index, arr) => ({
      name: slugPart.charAt(0).toUpperCase() + slugPart.slice(1).replace(/-/g, ' '),
      url: '/faq/' + arr.slice(0, index + 1).join('/'),
    }));

    const storyData = res.data.story.content;
    const seoData = storyData.seo && storyData.seo.length > 0 ? storyData.seo[0] : {};

    const metaTitle = seoData.MetaTitle || storyData.title || 'Título Padrão';
    const metaDescription = seoData.MetaDescription || extractText(storyData.content) || 'Descrição padrão para SEO.';
    const canonicalUrl = seoData.CanonicalURL || `${hostname}/faq/${params.slug.join('/')}`;

    let accordionContent = [];
    if (articleContent.content.accordion) {
      accordionContent = articleContent.content.accordion.map((acc) => {
        const categories = acc.content ? acc.content.accordion : [acc];
        return categories.map((category) => ({
          title: category.title || 'No title provided',
          menu: (category.AccordionMenu || []).map((menuItem) => ({
            title: menuItem.title || 'No link title',
            url: menuItem.url ? menuItem.url.cached_url || '#' : '#',
          })),
        }));
      }).flat();
    }

    const pageProps = {
      metaTitle,
      metaDescription,
      canonicalUrl,
      articleContent: articleContent.content,
      pageContent: articleContent.content, // Ensure this is added for HomeDynamic
      breadcrumb: breadcrumbItems,
      accordion: accordionContent,
      component: storyData.component,
      preview: false,
    };

    console.log('Processed Page Props:', pageProps);

    return {
      props: pageProps,
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching article content:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const response = await Storyblok.get('cdn/links/', {
    starts_with: '',
  });

  const paths = Object.keys(response.data.links).map((slug) => ({
    params: { slug: slug.split('/').filter(Boolean) },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function DynamicPage(props) {
  const { component, ...rest } = props;

  console.log('Dynamic Page Props:', props);

  if (component === 'HomeDynamic') {
    return <HomeDynamic {...rest} />;
  }

  if (component === 'CategoryPage') {
    return <CategoryPage {...rest} />;
  }

  return <p>Component not found</p>;
}