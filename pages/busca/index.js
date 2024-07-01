'use client'
import axios from "axios";
import Head from 'next/head';
import Script from "next/script";
import { useSearchParams } from 'next/navigation';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Grid from '../../components/Grid';
import Storyblok from '../../storyblok-config';
import { useEffect, useMemo, useState } from 'react';
import { Container, Heading, LinkDetails, Pagination, Spinner, TabSelect } from 'mondrian-react';

export default function Busca({pageContent}) {
    const { grid: gridArray, globalLinksMenu } = pageContent;
    
    const [suggestions, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numb, setNumb] = useState(2);
    const [selectOptions, setSelectOptions] = useState('mais-recentes');

    const searchParams = useSearchParams();
    const search = searchParams.get('pesquisa');
    const searchTerm = search;

    // Paginação
    const pageSize = 10;
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return suggestions.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, suggestions]);
    

    // Busca
    useEffect(() => {
        const fetchSuggestions = async (searchText) => {
            try {
                const response = await axios.get(`/faq/api/getStories?query=${encodeURIComponent(searchText)}`);
                const filteredSuggestions = response.data.filter(suggestion => !suggestion.full_slug.includes('redirecionamentos') && !suggestion.full_slug.includes('home') && !suggestion.full_slug.includes('/page404') && !/\/globallinks[^/]*$/.test(suggestion.full_slug));
                filteredSuggestions.length > 0 ? setNumb(1) : setNumb(0);
                setSuggestions(filteredSuggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
                setNumb(0);
            }
            console.log('>> suggestions: ', suggestions);
        };
        fetchSuggestions(searchTerm);
    },[]);



    // Concatena richText 
    function mergeText(params) {
        let finalText = '';
        const txt = params.filter(item => item.text);
        txt.forEach((item) => finalText += (' '+ item.text));

        return finalText.substring(0, 180) + '...';
    }



    //changeOrder
    useEffect(() => {
        let suggestions2 = [];

        if (selectOptions == 'mais-antigos') {
            suggestions2 = suggestions.sort((a, b) => a.published_at.localeCompare(b.published_at));
        }else{
            suggestions2 = suggestions.sort((a, b) => b.published_at.localeCompare(a.published_at))
        }
        
        setSuggestions([...suggestions2]);

    },[selectOptions]);
    
    // Se retornar resultado:
    const SearchResults = ()=> {
        return (
            <>
                <div className="mdn-Col-xs mdn-u-padding--md mdn-u-marginTop--xxxs flex place-content-between align-middle">
                    <Heading className="mt-2"><span className="text-red-600">{suggestions.length}</span> {suggestions.length > 1 ? 'resultados' : 'resultado'}</Heading>
                    <div className="mdn-Input mdn-Input--activatedField mdn-Calendar-header-month">
                        <select id="calendar-month" value={selectOptions} name="ordenar" onChange={e => setSelectOptions(e.target.value)} className="mdn-Input-field text-left" data-mdn-type="select">
                            <option value="mais-recentes">Mais recentes</option>
                            <option value="mais-antigos">Mais antigos</option>
                        </select>
                        <label htmlFor="calendar-month" className="mdn-Input-label text-left">Ordenar por</label>
                        <small className="mdn-Input-errorFeedback">Por favor, preencha este campo corretamente.</small>
                    </div>
                </div>
                <TabSelect
                    fluid="true" 
                    swiperConfigs
                    // onTabChange={handleTabSelectClick}
                    data={[
                    {
                        title: `Claro Móvel (${suggestions.length})`,
                        content: <ul className="mdn-u-padding--md">
                                    {currentTableData.map(item => {
                                        return (
                                            <li key={item.id}>
                                                <LinkDetails className="mb-8"
                                                    data={[
                                                        {
                                                        title: item.name,
                                                        description: mergeText(item.content.content.content[0].content),
                                                        href: `/faq/${item.full_slug}`
                                                        }
                                                    ]}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                    },
                    {
                        title: 'Claro residencial (1)',
                        content: <p>Claro residencial</p>
                    },
                    {
                        title: 'Fatura (1)',
                        content: <p>Fatura</p>
                    },
                    {
                        title: 'Outros Assuntos (1)',
                        content: <p>Fatura</p>
                    }
                    ]}
                />
                <div className="mdn-u-padding--md" style={{padding: "var(--theme-spacing-stack-md) 0", textAlign: "center"}}>
                    <Pagination currentPage={currentPage}
                        totalCount={suggestions.length}
                        pageSize={pageSize}
                        onPageChange={page => setCurrentPage(page)} 
                    />
                </div>
            </>
        )
    }


    // Se não retornar resultado:
    const SearchNoResults = ()=> {
        return (
            <Container>
                <h1 className="mdn-Heading mdn-Heading--xs text-center mt-8 mb-12">Infelizmente não encontramos o que você estava procurando. <span className="text-red-500"> :(</span><br/>Você pode tentar realizar uma nova busca, ou acessar alguma categoria abaixo:</h1>
                <div className="mdn-Row mb-48">
                    <div className="mdn-Col-xs mdn-u-padding--xs">
                    <Grid gridData={gridArray} />
                    </div>
                </div>
            </Container>
        )
    }


    return (
        <main>
            <Head>
                <title>{`Busca: ${searchTerm} | Claro FAQ`}</title>
                <meta name="description" content='Tire suas dúvidas sobre como, planos, serviços e atendimento móvel e residencial.'/>
                <link rel="canonical" href={'canonicalUrl'} />
                <meta name="robots" content={'noindex, nofollow'} />
                <meta property="og:title" content={`Resultado de busca para: ${searchTerm}`} />
                <meta property="og:description" content='Tire suas dúvidas sobre como, planos, serviços e atendimento móvel e residencial.' />
                <meta property="og:image" content="https://a.storyblok.com/f/283011/80x80/4166c5cc1b/claro-faq.webp" />
                <meta property="og:type" content="FAQ" />
                <meta property="og:url" content='https://www.claro.com.br/faq/busca'/>
            </Head>
            <Script
                src="https://plugin.handtalk.me/web/latest/handtalk.min.js"
                strategy="lazyOnload"
                onLoad={() => { }}
            />
            <Header {...globalLinksMenu} />
            <div className="mdn-Container h-full grow flex flex-col">
                <div className="mdn-Row">
                    <div className="mdn-Col-xs mdn-u-padding--sm mdn-u-marginTop--xxxs">
                        <SearchBar placeholder={'searchPlaceholder' || "Digite sua busca"} />
                    </div>
                </div>
                <div className="mdn-Row grow">
                    <div className="mdn-Col-xs mdn-u-padding--sm mdn-u-marginTop--xxxs">
                        {numb === 0 && <SearchNoResults />}
                        {numb === 1 && <SearchResults />}
                        {numb === 2 && <Spinner isLoading className='relative h-full'/>}
                    </div>
                </div>
            </div>
        </main>
    );
}









export async function getServerSideProps() {
    let pageContent = {};


    //pageContent
    try {
        const res = await Storyblok.get(`cdn/stories/home`, {
        // version: 'draft',
        });

        pageContent = res.data.story.content || {}; // Assegure que o conteúdo não é undefined
    } catch (error) {
        console.error("Error fetching page content:", error);
    }

    //globalLinksMenu para os item do MENU
    let globalLinksMenu = [];
        const resCategories = await Storyblok.get('cdn/stories/global/globallinkscategorias', {
            // version: 'draft',
        });
        const globalLinksReceived = await resCategories.data.story.content.accordion || {};

        function resto(params) {
            return params.AccordionMenu.map((item) => item)
        };

        globalLinksMenu.push(await globalLinksReceived.map((item) => ({
            'title': item.title,
            'content': resto(item)
        })));

        pageContent.globalLinksMenu = globalLinksMenu || [];

    return { props: { pageContent } }
}