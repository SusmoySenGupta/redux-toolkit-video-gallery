import axios from '../../utils/axios';

export const getVideo = async (videoID) => {
	const response = await axios.get(`/videos/${videoID}`);

	return response.data;
};
