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
              icon: 'facebook',
              title: 'Facebook',
              rel: 'nofollow'
            },
            {
              href: 'https://twitter.com/clarobrasil',
              icon: 'twitter',
              title: 'Twitter',
              rel: 'nofollow'
            },
            {
              href: 'https://www.instagram.com/clarobrasil/',
              icon: 'instagram',
              title: 'Instagram',
              rel: 'nofollow'
            },                        
            {
              href: 'https://www.youtube.com/user/ClaroBrasil',
              icon: 'youtube',
              title: 'Youtube',
              rel: 'nofollow'
            },
            {
              href: 'https://www.linkedin.com/company/clarobrasil',
              icon: 'linkedin',
              title: 'Linkedin',
              rel: 'nofollow'
            },
            {
              href: 'https://www.tiktok.com/@clarobrasil',
              icon: 'tik-tok',
              title: 'Tik-tok',
              rel: 'nofollow'
            },
          ],
          privacy: [
            {
              href: 'https://www.claro.com.br/privacidade/politica-de-privacidade',
              target: '_blank',
              text: 'Política de Privacidade',
              title: 'Política de Privacidade'
            },
            {
              href: 'https://www.claro.com.br/privacidade',
              target: '_blank',
              text: 'Portal de Privacidade',
              title: 'Portal de Privacidade'
            }
          ]
        }}
      />
      {/* BaseComponent Code End */}
    </div>
  )
}