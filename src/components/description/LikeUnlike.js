import LikeImage from '../../assets/like.svg';
import UnlikeImage from '../../assets/unlike.svg';

export default function LikeUnlike({ likes = 0, unlikes = 0 }) {
	return (
		<div className="flex gap-10 w-48">
			<div className="flex gap-1">
				<div className="shrink-0">
					<img className="w-5 block" src={LikeImage} alt="Like" />
				</div>
				<div className="text-sm leading-[1.7142857] text-slate-600">
					{likes}
				</div>
			</div>
			<div className="flex gap-1">
				<div className="shrink-0">
					<img className="w-5 block" src={UnlikeImage} alt="Unlike" />
				</div>
				<div className="text-sm leading-[1.7142857] text-slate-600">
					{unlikes}
				</div>
			</div>
		</div>
	);
}
