import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
	id: number;
	count: number;
} 

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (existed) {
				existed.count += 1;
				return;
			}
			state.items.push({ id: action.payload, count: 1 });
		}
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
