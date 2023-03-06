import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/description/Player';
import VideoDescription from '../components/description/VideoDescription';
import RelatedVideoList from '../components/list/RelatedVideoList';
import Loading from '../components/ui/Loading';
import { fetchVideo } from '../features/video/videoSlice';

export default function Video() {
	const dispatch = useDispatch();
	const { videoID } = useParams();
	const { video, isLoading, hasError, error } = useSelector(
		(state) => state.video
	);

	useEffect(() => {
		dispatch(fetchVideo(videoID));
	}, [dispatch, videoID]);

	const { link, title, id, tags } = video || {};

	let content = null;

	if (isLoading) content = <Loading />;
	if (!isLoading && hasError)
		content = <div className="col-span-12">{error}</div>;
	if (!isLoading && !hasError && !video?.id)
		content = <div className="col-span-12">No video found.</div>;
	if (!isLoading && !hasError && video?.id)
		content = (
			<div className="grid grid-cols-3 gap-2 lg:gap-8">
				<div className="col-span-full w-full space-y-8 lg:col-span-2">
					<VideoPlayer link={link} title={title} />
					<VideoDescription video={video} />
				</div>

				<RelatedVideoList currentVideoID={id} tags={tags} />
			</div>
		);

	return (
		<section className="pt-6 pb-20">
			<div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
				{content}
			</div>
		</section>
	);
}
