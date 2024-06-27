'use client'
import { Container, Heading, LinkDetails, LinkList, Pagination, TabSelect, Text } from "mondrian-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Grid from "./Grid";

export default function SearchResults({searchTerm, gridArray}) {
    console.log('gridArray: ', gridArray);
    const [suggestions, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

 
console.log('suggestionssssssssss: ', suggestions);
    const handleTabSelectClick = () => {};


    // Paginação
    const pageSize = 10;
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return suggestions.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, suggestions]);
    

    // Busca
    useEffect(()=>{
        const fetchSuggestions = async (searchText) => {
            try {
                const response = await axios.get(`/faq/api/getStories?query=${encodeURIComponent(searchText)}`);
                console.log('response: ', response);
                const filteredSuggestions = response.data.filter(suggestion => !suggestion.full_slug.includes('redirecionamentos') && !suggestion.full_slug.includes('home') && !suggestion.full_slug.includes('/page404') && !/\/globallinks[^/]*$/.test(suggestion.full_slug));
                setSuggestions(filteredSuggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
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

                
    // Se retornar resultado:             
    const SearchResults = ()=> {
        return (
            <>
                {/* <Heading md className="mt-2">{searchTerm} resultados</Heading> */}
                <div className="mdn-Col-xs mdn-u-padding--md mdn-u-marginTop--xxxs flex place-content-between align-middle">
                    <Heading md className="mt-2"><span className="text-red-600">{suggestions.length}</span> {suggestions.length > 1 ? 'resultados' : 'resultado'}</Heading>
                    <div className="mdn-Input mdn-Input--activatedField mdn-Calendar-header-month">
                        <select id="calendar-month" className="mdn-Input-field text-left" data-mdn-type="select">
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
                    onTabChange={handleTabSelectClick}
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
                                                        // description: 'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Quem num gosta di mim que vai caçá sua turmis! Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.',
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
                        title: 'Oitros Assuntos (1)',
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

    const SearchNoResults = ()=> {
        return (
            <Container>
                {/* <p>{JSON.stringify(suggestions.length)}</p> */}
                <h1 className="mdn-Heading mdn-Heading--xs text-center mt-8 mb-12">Infelizmente não encontramos o que você estava procurando. <span className="text-red-500"> :(</span><br/>Você pode tentar realizar uma nova busca, ou acessar alguma categoria abaixo:</h1>
                <div className="mdn-Row mb-48">
                    <div className="mdn-Col-xs mdn-u-padding--xs">
                    <Grid gridData={gridArray} />
                    </div>
                </div>
            </Container>
        )
    }
    // Se nao retornar resultado:
    if(suggestions.length === 0) {
        return <SearchNoResults/>
    }else{
        return <SearchResults/>
    }
            
    
}