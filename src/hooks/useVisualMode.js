/**
 * A custom hook that manages the visual mode of a component.
 *
 * @param {String} initial - The initial mode of the component.
 * @returns {Object} - An object containing the current mode, a function to transition to a new mode, and a function to go back to the previous mode.
 */

import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Transitions to a new mode and updates the history.
   * @param {string} newMode - The new mode to transition to.
   * @param {boolean} [replace=false] - Whether to replace the current mode in the history or add a new one.
   * @returns None
   */
  function transition(newMode, replace = false) {
    setMode(newMode);
    replace
      ? history.splice(-1, 1, newMode)
      : setHistory((prev) => [...prev, newMode]);
  }

  // Goes back to the previous mode in the history array if there is one.
  function back() {
    history.length > 1 && history.pop();
    const prev = history[history.length - 1];
    setMode(prev);
  }

  return { mode, transition, back };
}
