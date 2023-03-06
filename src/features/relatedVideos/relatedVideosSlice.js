import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRelatedVideos } from './relatedVideosAPI';

const initialState = {
	relatedVideos: [],
	isLoading: false,
	hasError: false,
	error: '',
};

export const fetchRelatedVideos = createAsyncThunk(
	'relatedVideos/fetchRelatedVideos',
	async ({ tags, exceptVideoID }) => {
		const relatedVideos = await getRelatedVideos({ tags, exceptVideoID });
		return relatedVideos;
	}
);

const relatedVideoSlice = createSlice({
	name: 'relatedVideos',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchRelatedVideos.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchRelatedVideos.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.hasError = false;
				state.relatedVideos = payload;
			})
			.addCase(fetchRelatedVideos.rejected, (state, { error }) => {
				state.isLoading = false;
				state.relatedVideos = [];
				state.hasError = true;
				state.error = error?.message;
			});
	},
});

export default relatedVideoSlice.reducer;
