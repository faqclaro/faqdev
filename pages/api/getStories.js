import Storyblok from '../../storyblok-config';

export default async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { query } = req.query;
            const response = await Storyblok.get('cdn/stories', {
                sort_by: 'published_at:desc',
                search_term: query,
                per_page: 100,
                is_startpage: false,
                // version: 'draft'
            });

            const storyLinks = response.data.stories

            console.log('storyLinks: ', storyLinks);

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