import React, { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(newMode) {
    setMode(newMode)
  }

  return { mode, transition };
}
