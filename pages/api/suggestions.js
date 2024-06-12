import axios from 'axios';
import StoryblokClient from '../../storyblok-config';

export default async (req, res) => {
    if (req.method === 'GET') {
      try {
        const { query } = req.query;
        const response = await StoryblokClient.get('cdn/stories', {
          starts_with: '', // Ajuste se precisar limitar a busca a um diretório específico
          search_term: query,
          version: 'draft' // ou 'published'
        });
  
        const storyLinks = response.data.stories
          .filter(story => story.full_slug !== '/home') // Remover artigos com link '/home'
          .map(story => ({
            title: story.content.title,
            link: `/${story.full_slug}` // ou qualquer campo que contenha o link
          }));
  
        res.status(200).json(storyLinks);
      } catch (error) {
        console.error("Error fetching suggestions from Storyblok:", error);
        res.status(500).json({ message: 'Error fetching suggestions' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };