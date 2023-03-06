import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedVideos } from '../../features/relatedVideos/relatedVideosSlice';
import Loading from '../ui/Loading';
import RelatedVideoListItem from './RelatedVideoListItem';

export default function RelatedVideoList({ currentVideoID, tags }) {
	const dispatch = useDispatch();
	const { relatedVideos, isLoading, hasError, error } = useSelector(
		(state) => state.relatedVideos
	);

	useEffect(() => {
		dispatch(fetchRelatedVideos({ tags, exceptVideoID: currentVideoID }));
	}, [dispatch, currentVideoID, tags]);

	let content = null;
	if (isLoading) content = <Loading />;
	if (!isLoading && hasError)
		content = <div className="col-span-12">{error}</div>;
	if (!isLoading && !hasError && relatedVideos?.length === 0)
		content = <div className="col-span-12">No related videos found.</div>;
	if (!isLoading && !hasError && relatedVideos?.length > 0)
		content = relatedVideos.map((video) => (
			<RelatedVideoListItem key={video.id} video={video} />
		));

	return (
		<div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
			{content}
		</div>
	);
}
