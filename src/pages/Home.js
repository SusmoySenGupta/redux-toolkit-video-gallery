import Footer from '../components/Footer';
import VideoGrid from '../components/grid/VideoGrid';
import Navbar from '../components/Navbar';
import TagList from '../components/tags/TagList';
import Pagination from '../components/ui/Pagination';

export default function Home() {
	return (
		<>
			<Navbar />

			<TagList />

			<VideoGrid />

			<Pagination />

			<Footer />
		</>
	);
}
