import { useState } from 'react';
import { useRouter } from "next/router";
import { Menu} from 'mondrian-react';

export default function Header(headerProps) {
  const [mode, setMode] = useState('contrast');

  const toggleTheme = () => {
    setMode(mode === 'contrast' ? 'claro' : 'contrast');
    window.MondrianReact.setTheme(mode);
  }

  const segments = [
    {
      title: 'Home',
      href: '/faq',
      isActive: false
    },
    {
      title: 'Ajude o RS',
      href: '/faq/ajude-o-rio-grande-do-sul',
      isActive: false
    }
  ]
  
  const icons = [
    {
      tag: 'a',
      'aria-label': 'pcd',
      href: 'https://www.claro.com.br/institucional/regulatorio/acessibilidade',
      icon: 'pcd',
      title: 'Conheça as iniciativas de Acessibilidade da Claro'
    },
    {
      tag: 'button',
      'aria-label': 'libras',
      icon: 'libras',
      title: 'Assistente de Libras',
      onClick: () => {
        var ht = new HT({
        avatar: "MAYA",
        align: "top",
        side: "right",
        token: "7980f66fc04e8a51e244928880939142"
      });}
    },
    {
      tag: 'button',
      'aria-label': 'contraste',
      icon: 'alto-contraste',
      title: 'Opção de acessibilidade. Clique para alterar o contraste do Portal',
      onClick: toggleTheme
    }
  ]

  const menuList = [];

  const router = useRouter();
  const urlRouter = router.query;
  const findUrlRouter = urlRouter.slug ? `/faq/${urlRouter.slug[0]}` : '/faq';
  const itemSegment = segments.findIndex((item) => item.href === findUrlRouter);
  itemSegment >= 0 ? segments[itemSegment].isActive = true : false

  function makeMenu(params) {
    let data = params;
    let itens = [];
    for (const iterator in data) {
      itens.push( 
        <li key={data[iterator].title} className="mdn-LinkList-item">
          <a className="mdn-LinkList-anchor" href={`/faq/${data[iterator].url.url}`}>
            {data[iterator].title}
          </a>
        </li>
      )
    }
    return itens
  }

  for (const iterator in headerProps[0]) {

    const title = headerProps[0][iterator].title;
    const content = headerProps[0][iterator].content;
    
    const item = {
      title: title,
      content: (
        <>
          <ul className="mdn-Menu-subMenu-list">
            <li className="mdn-Menu-subMenu-list-item">
              <button className="mdn-Menu-subMenu-back" title="Click para Voltar ao nível anterior" type="button">
                <span className="mdn-Icon-esquerda mdn-Icon--md"></span>
                <span className="mdn-Text">Category</span>
              </button>
              <ul className="mdn-Menu-subMenu-list mdn-LinkList">
                {makeMenu(content)} 
              </ul>
            </li>
          </ul>
        </>
      )
    }
    menuList.push(item);
    }

  menuList.sort((a, b) => a.title.localeCompare(b.title));

  const data = {
    segments: segments,
    icons: icons,
    // countries: countries,
    menuList: menuList,
    // buttonList: buttonList
  }

  return <Menu public data={data} />
}