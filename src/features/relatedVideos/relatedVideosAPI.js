import axios from '../../utils/axios';

export const getRelatedVideos = async ({ tags, exceptVideoID }) => {
	const limit = 5;
	let queryString =
		tags?.length > 0
			? tags.map((tag) => `tags_like=${tag}`).join('&') +
			  `&id_ne=${exceptVideoID}&_limit=${limit}`
			: `id_ne=${exceptVideoID}&_limit=${limit}`;

	const response = await axios.get(`/videos?${queryString}`);

	return response.data;
};
