import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const searchRef = useRef(null); // Ref para o input de pesquisa

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Verificar se o clique ocorreu fora do componente de pesquisa
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Limpar as sugestões
        setSuggestions([]);
      }
    };

    // Adicionar event listener para cliques fora do componente
    document.addEventListener('mousedown', handleOutsideClick);

    // Remover o event listener quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // Limpar o campo de busca ao mudar de página
    setSearchTerm('');
    // Limpar as sugestões ao mudar de página
    setSuggestions([]);
  }, [router.pathname]); // Observar alterações na rota

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      await fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleFocusOut = async (event) => {setSearchTerm('');}

  const fetchSuggestions = async (searchText) => {
    try {
      const response = await axios.get(`/faq/api/suggestions?query=${encodeURIComponent(searchText)}`);
      // Filtrar as sugestões para remover aquelas com "/home" no slug
      const filteredSuggestions = response.data.filter(suggestion => !suggestion.link.includes('/home') && !suggestion.link.includes('/page404') && !/\/globallinks[^/]*$/.test(suggestion.link));
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSuggestions([]);
  };

  return (
    
      <fieldset>
        <legend hidden>Preencha este campo</legend>
        <div className="mdn-Input" ref={searchRef}>
          <div style={{ position: 'relative', background: 'var(--theme-background-color--default)', borderRadius: '14px' }}>
            <i className="mdn-Icon-busca mdn-Icon--md" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
            <input 
              id="search" 
              className="mdn-Input-field" 
              type="text" 
              value={searchTerm}
              onChange={handleInputChange}
              onBlur={handleFocusOut}
              aria-label="Search" 
              style={{ paddingLeft: '45px', borderColor : 'var(--theme-toggleColor-Menu-default)' }} // Adicionar espaço para o ícone
            />
            <label htmlFor="search" className="mdn-Input-label">Digite aqui para buscar...</label>
          </div>
          <small className="mdn-Input-errorFeedback">Por favor, preencha este campo corretamente.</small>
          {suggestions.length > 0 && (
            <ul className="mdn-LinkList" style={{ position: 'absolute', width: '100%', zIndex: 1000, backgroundColor: 'var(--theme-background-color--default)' }}>
              {suggestions.map((suggestion, index) => (
                <li key={index} className="mdn-LinkList-item">
                  <a className="mdn-LinkList-anchor" href="#" onClick={(e) => {
                    e.preventDefault();
                    router.push(suggestion.link);
                    setSuggestions([]); // Limpar as sugestões ao clicar em uma sugestão
                  }}>
                    {suggestion.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>
    
  );
};

export default SearchBar;
