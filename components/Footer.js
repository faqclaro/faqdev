export default function Footer(footerProps) {
  const handlerLibras = () => {
    var ht = new HT({
      avatar: "MAYA",
      align: "top",
      side: "right",
      token: "7980f66fc04e8a51e244928880939142"
    });
  }
  return (
    <footer id="cms-Footer" className="cms-Footer--amx cms-bgInverse">
      <div>
        <div className="mdn-Footer mdn-Footer--default mdn-Footer--signature  mdn-Footer--social " role="contentinfo">
          <div className="mdn-Container">
            <div className="mdn-Footer-content">
              <div className="mdn-Footer-social-and-disclaimer">
                <ul className="mdn-Footer-list">
                  <li className="mdn-Footer-list-item"><a className="cms-Link gtm-element-event" title="Acesse o canal oficial do Facebook da Claro" target="_self" href="https://www.facebook.com/clarobrasil"><span aria-hidden="true" className="mdn-Icon-facebook mdn-Icon--md"></span></a></li>
                  <li className="mdn-Footer-list-item"><a className="cms-Link gtm-element-event" title="Acesse o canal oficial do Twitter da Claro" target="_self" rel="nofollow" href="https://twitter.com/clarobrasil"><span aria-hidden="true" className="mdn-Icon-twitter mdn-Icon--md"></span></a></li>
                  <li className="mdn-Footer-list-item"><a className="cms-Link gtm-element-event" title="Acesse o canal oficial do Instagram da Claro" target="_self" rel="nofollow" href="https://www.instagram.com/clarobrasil/"><span aria-hidden="true" className="mdn-Icon-instagram mdn-Icon--md"></span></a></li>
                  <li className="mdn-Footer-list-item"><a className="cms-Link gtm-element-event" title="Acesse o canal oficial do Youtube da Claro" target="_self" rel="nofollow" href="https://www.youtube.com/user/clarobrasil"><span aria-hidden="true" className="mdn-Icon-youtube mdn-Icon--md"></span></a></li>
                  <li className="mdn-Footer-list-item"><a className="cms-Link gtm-element-event" title="Acesse o canal oficial do Linkedin da Claro" target="_self" rel="nofollow" href="https://www.linkedin.com/company/clarobrasil"><span aria-hidden="true" className="mdn-Icon-linkedin mdn-Icon--md"></span></a></li>
                  <li className="mdn-Footer-list-item"><a className="cms-Link gtm-element-event" title="Acesse o canal oficial do Tik Tok da Claro" target="_self" rel="nofollow" href="https://www.tiktok.com/@clarobrasil"><span aria-hidden="true" className="mdn-Icon-tik-tok mdn-Icon--md"></span></a></li>
                  <li className="mdn-Footer-list-item"><a className="cms-Link gtm-element-event" title="Acesse o canal oficial da Glassdoor da Claro" target="_self" rel="nofollow" href="https://www.glassdoor.com.br/Avalia%C3%A7%C3%B5es/Claro-Avalia%C3%A7%C3%B5es-E748887.htm"><span aria-hidden="true" className="mdn-Icon-glassdoor mdn-Icon--md"></span></a></li>
                </ul>
                <div className="mdn-Footer-disclaimer">
                  <p className="mdn-Text mdn-Text--caption mdn-Text--inverse"><a className="cms-Link gtm-element-event mdn-Footer-disclaimer-link" title="Acessar Política de Privacidade" target="_self" href="https://www.claro.com.br/privacidade/politica-de-privacidade">Política de Privacidade</a><a className="cms-Link gtm-element-event mdn-Footer-disclaimer-link" title="Acessar Portal de Privacidade" target="_self" href="https://www.claro.com.br/privacidade">Portal de Privacidade</a>
                    <button onClick={handlerLibras} className="mdn-Footer-disclaimer-librasLink gtm-element-event cms-gtm-cortain" title="Assistente de Libras" aria-label="Assistente de Libras"><i className="mdn-Icon-libras mdn-Icon--sm" style={{color: "var(--color-neutral-lightest)", cursor: "pointer"}}></i></button>
                  </p>
                  <p className="mdn-Text mdn-Text--caption mdn-Text--inverse"><strong>© 2024 Claro. Todos os direitos reservados. CNPJ: 40.432.544/0001-47 - <addres className="inline">Rua Henri Dunant, 780 - São Paulo - SP</addres></strong></p>
                </div>
              </div>
              <div className="mdn-Footer-logo mdn-Footer-logo--custom">
                <img className="mdn-Footer-logo-image" src="https://mondrian.claro.com.br/brands/nosvg/assinatura-claro.png" alt="logo-claro-rodape" width="48" height="48"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}