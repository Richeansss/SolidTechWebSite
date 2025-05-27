import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { IDecodedToken } from '../../types/types';

interface AuthState {
    jwt: string | null;
    role: string | null;
    isAuthenticated: boolean;
}

const storedJwt = Cookies.get('jwt') || null;
const initialState: AuthState = {
    jwt: storedJwt,
    role: storedJwt ? jwtDecode<IDecodedToken>(storedJwt).roles?.[0] || null : null,
    isAuthenticated: !!storedJwt,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ jwt: string }>) => {
            const jwt = action.payload.jwt;
            const decoded = jwtDecode<IDecodedToken>(jwt);

            Cookies.set('jwt', jwt, { expires: 1 });

            state.jwt = jwt;
            state.role = decoded.roles?.[0] || null;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            Cookies.remove('jwt');
            state.jwt = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.role;

export default authSlice.reducer;
