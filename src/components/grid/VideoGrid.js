import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../features/videos/videosSlice';
import Loading from '../ui/Loading';
import VideoGridItem from './VideoGridItem';

export default function VideoGrid() {
	const dispatch = useDispatch();
	const { videos, isLoading, hasError, error } = useSelector(
		(state) => state.videos
	);

	useEffect(() => {
		dispatch(fetchVideos());
	}, [dispatch]);

	let content = null;

	if (isLoading) {
		content = <Loading />;
	} else if (hasError) {
		content = <div className="col-span-12">{error}</div>;
	} else if (videos.length === 0) {
		content = <div className="col-span-12">No videos found.</div>;
	} else if (videos.length > 0) {
		content = videos.map((video) => (
			<VideoGridItem key={video.id} video={video} />
		));
	}

	return (
		<section className="pt-12">
			<section className="pt-12">
				<div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
					{content}
				</div>
			</section>
		</section>
	);
}
