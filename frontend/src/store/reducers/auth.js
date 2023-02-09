import * as actionTypes from "../constants/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	token: null,
	user: null,
	loginInProgress: false,
}

const authStart = (state, action) => {
	return updateObject(state, { loginInProgress: true })
}

const authLogout = (state, action) => {
	return updateObject(state, { token: null, user: null })
}

const authUserVerfiedOrNot = (state, action) => updateObject(state, {
	user: action.user,
	token: action.token,
	loginInProgress: false,
})

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action)
		case actionTypes.AUTH_SUCCESS:
			return authUserVerfiedOrNot(state, action)
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action)
		default:
			return state
	}
}

export default authReducer