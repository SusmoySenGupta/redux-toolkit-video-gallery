import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideos } from './videosAPI';

const initialState = {
	videos: [],
	isLoading: false,
	hasError: false,
	error: '',
};

export const fetchVideos = createAsyncThunk(
	'videos/fetchVideos',
	async ({ tags, search }) => {
		const videos = await getVideos(tags, search);
		return videos;
	}
);

const videoSlice = createSlice({
	name: 'videos',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideos.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchVideos.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.hasError = false;
				state.videos = payload;
			})
			.addCase(fetchVideos.rejected, (state, { error }) => {
				state.isLoading = false;
				state.videos = [];
				state.hasError = true;
				state.error = error?.message;
			});
	},
});

export default videoSlice.reducer;
