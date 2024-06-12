import { Header } from 'mondrian-react'

export default function Sample() {
  return (
    <div>
      {/* BaseComponent Code Start */}
      <Header
        data={{
          icons: [
            {
              tagName: 'a',
              title: 'Conheça as iniciativas de Acessibilidade da Claro',
              href: 'https://www.claro.com.br/institucional/regulatorio/acessibilidade/',
              icon: 'pcd'
            },
            {
              tagName: 'button',
              title: 'Assistente de Libras',
              icon: 'libras'
            },
            {
              tagName: 'button',
              title:
                'Opção de acessibilidade. Clique para alterar o contraste do Portal',
              icon: 'alto-contraste'
            }
          ]
        }}
      />
      {/* BaseComponent Code End */}
    </div>
  )
}