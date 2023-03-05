import VideoGrid from '../components/grid/VideoGrid';
import TagList from '../components/tags/TagList';
import Pagination from '../components/ui/Pagination';

export default function Home() {
	return (
		<>
			<TagList />
			<VideoGrid />
			<Pagination />
		</>
	);
}
