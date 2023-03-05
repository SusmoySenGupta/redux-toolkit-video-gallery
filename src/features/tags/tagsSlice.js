import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTags } from './tagsAPI';

const initialState = {
	tags: [],
	isLoading: false,
	hasError: false,
	error: '',
};

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
	const tags = await getTags();
	return tags;
});

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchTags.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchTags.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.hasError = false;
				state.tags = payload;
			})
			.addCase(fetchTags.rejected, (state, { error }) => {
				state.isLoading = false;
				state.tags = [];
				state.hasError = true;
				state.error = error?.message;
			});
	},
});

export default tagsSlice.reducer;
