import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import type { LoginResponse } from '../interfaces/auth.interface';
import { PREFFIX } from '../helpers/API';
import type { Profile } from '../interfaces/user.interface';
import type { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'jwt';

interface UserState {
	jwt: string | null;
	loginErrorMessage?: string;
	profile?: Profile;
	profileErrorMessage?: string;
	registerErrorMessage?: string;
}

const initialState: UserState = {
	jwt: loadState(JWT_PERSISTENT_STATE) ?? null
};

export const login = createAsyncThunk('user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFFIX}/auth/login`, params);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	});

export const register = createAsyncThunk('user/register',
	async (params: { email: string; password: string, name: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFFIX}/auth/register`, params);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	});

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/profile',
	async (_, thunkApi) => {
		const { data } = await axios.get<Profile>(`${PREFFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${thunkApi.getState().user.jwt}`
			}
		});
		return data;
	});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.loginErrorMessage = undefined;
		}
	},
	extraReducers: (builder) =>  {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.profile = action.payload;
		});
		builder.addCase(getProfile.rejected, (state, action) => {
			state.profileErrorMessage = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
