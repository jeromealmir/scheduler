import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode)
  
    //if replace is truthy, replace current mode in history otherwise add current mode to history
    replace ? history.splice(-1, 1, newMode) : setHistory(prev => [...prev, newMode])

  }

  function back() {

    //remove last item from history only if history.length is more than one
    history.length > 1 && history.pop()
    
    const prev = history.slice(-1).toString();
    setMode(prev)
  }

  return { mode, transition, back };
}
