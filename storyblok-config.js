// storyblok-config.js
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN, // Aqui você deveria usar variáveis de ambiente
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});

export default Storyblok;


