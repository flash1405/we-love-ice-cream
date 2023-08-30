export const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REORDER_PREFERENCES: "REORDER_PREFERENCES",
  INITIALIZE_PREFERENCES: "INITIALIZE_PREFERENCES",
};

export const login = (user) => ({
  type: ActionTypes.LOGIN,
  payload: user,
});

export const logout = () => ({
  type: ActionTypes.LOGOUT,
});

export const reorderPreferences = (newPreferences) => ({
  type: ActionTypes.REORDER_PREFERENCES,
  payload: newPreferences,
});

export const initializePreferences = (preferences) => ({
  type: ActionTypes.INITIALIZE_PREFERENCES,
  payload: preferences,
});

export const updatePreferencesInLocalStorage = (preferences, username) => {
  localStorage.setItem(
    `iceCreamPreferences_${username}`,
    JSON.stringify(preferences)
  );
};
