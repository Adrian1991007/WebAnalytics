// action - state management
import { REGISTER, LOGIN, LOGOUT, SET_WEBSITE, UPDATE_PROFILE } from './actions';

// initial state
export const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  isInitialized: false,
  isWebsiteInitiate: localStorage.getItem('isWebsiteInitiate'),
  isProfileUpdated: false,
  user: null,
  website: null
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      localStorage.setItem('isLoggedIn', true);
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case SET_WEBSITE: {
      const { website, isWebsiteInitiate } = action.payload;
      localStorage.setItem('isWebsiteInitiate', true);
      return {
        ...state,
        isWebsiteInitiate,
        website
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        isProfileUpdated: !state.isProfileUpdated
      };
    }
    case LOGOUT: {
      localStorage.clear();
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        website: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
