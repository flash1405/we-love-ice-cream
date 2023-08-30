import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  reorderPreferences,
  initializePreferences,
  updatePreferencesInLocalStorage,
} from "../redux/actions";

const IceCreamPreferences = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [preferences, setPreferences] = useState(
    currentUser.iceCreamPreferences
  );

  useEffect(() => {
    // Initialize preferences from local storage
    const storedPreferences = JSON.parse(
      localStorage.getItem(`iceCreamPreferences_${currentUser.username}`)
    );
    if (storedPreferences) {
      setPreferences(storedPreferences);
      dispatch(initializePreferences(storedPreferences));
    }
  }, [dispatch, currentUser.username]);

  const sortedPreferences = Object.keys(preferences)
    .sort((a, b) => preferences[a].order - preferences[b].order)
    .reduce((sorted, flavor) => {
      sorted[flavor] = preferences[flavor];
      return sorted;
    }, {});

  const handleReorder = (flavor, newPosition) => {
    const reorderedPreferences = { ...preferences };
    const flavors = Object.keys(reorderedPreferences);
    flavors.sort((a, b) => {
      if (a === flavor) return newPosition - reorderedPreferences[b].order;
      if (b === flavor) return reorderedPreferences[a].order - newPosition;
      return reorderedPreferences[a].order - reorderedPreferences[b].order;
    });
    flavors.forEach((flavor, index) => {
      reorderedPreferences[flavor].order = index + 1;
    });
    setPreferences(reorderedPreferences);
  };

  const handleEditNote = (flavor, newNote) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [flavor]: { ...prevPreferences[flavor], notes: newNote },
    }));
  };

  const handleSaveChanges = () => {
    // Update preferences in Redux store
    dispatch(reorderPreferences(preferences));
    updatePreferencesInLocalStorage(preferences, currentUser.username);
  };

  return (
    <div className="container">
      <div className="preferences-container">
        <h2>Your Ice Cream Preferences</h2>
        <ul>
          {Object.keys(sortedPreferences).map((flavor) => (
            <li key={flavor}>
              <strong>{flavor}</strong>
              <p>Order: {sortedPreferences[flavor].order}</p>
              <input
                type="text"
                value={sortedPreferences[flavor].notes}
                onChange={(e) => handleEditNote(flavor, e.target.value)}
              />
              <button onClick={() => handleReorder(flavor, 0)}>
                Move to Top
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default IceCreamPreferences;
