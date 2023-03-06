import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideo } from './videoAPI';

const initialState = {
	video: {},
	isLoading: false,
	hasError: false,
	error: '',
};

export const fetchVideo = createAsyncThunk(
	'video/fetchVideo',
	async (videoID) => {
		const videos = await getVideo(videoID);
		return videos;
	}
);

const videoSlice = createSlice({
	name: 'video',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideo.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchVideo.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.hasError = false;
				state.video = payload;
			})
			.addCase(fetchVideo.rejected, (state, { error }) => {
				state.isLoading = false;
				state.video = {};
				state.hasError = true;
				state.error = error?.message;
			});
	},
});

export default videoSlice.reducer;
