import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    setMode(newMode)
    setHistory(prev => [...prev, newMode])
  }

  function back() {

    if (history.length > 1) {
      history.pop()
    }
    
    const prev = history.slice(-1).toString();
    setMode(prev)
  }

  return { mode, transition, back };
}
