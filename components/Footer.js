import { Footer } from 'mondrian-react'

export default function Sample() {
  return (
    <div>
      {/* BaseComponent Code Start */}
      <Footer
        onClickLibras={() => {}}
        data={{
          social: [
            {
              href: 'https://www.facebook.com/clarobrasil',
              icon: 'facebook'
            },
            {
              href: 'https://twitter.com/clarobrasil',
              icon: 'twitter'
            },
            {
              href: 'https://www.instagram.com/clarobrasil/',
              icon: 'instagram'
            },                        
            {
              href: 'https://www.youtube.com/user/ClaroBrasil',
              icon: 'youtube'
            },
            {
              href: 'https://www.linkedin.com/company/clarobrasil',
              icon: 'linkedin'
            },
            {
              href: 'https://www.tiktok.com/@clarobrasil',
              icon: 'tik-tok'
            },
          ],
          privacy: [
            {
              href: 'https://www.claro.com.br/privacidade/politica-de-privacidade',
              target: '_blank',
              text: 'Política de Privacidade'
            },
            {
              href: 'https://www.claro.com.br/privacidade',
              target: '_blank',
              text: 'Portal de Privacidade'
            }
          ]
        }}
      />
      {/* BaseComponent Code End */}
    </div>
  )
}