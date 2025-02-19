import React, { createContext, useState } from "react";

export const EvaluationContext = createContext();

export const EvaluationProvider = ({ children }) => {
  const [evaluationData, setEvaluationData] = useState({});

  return (
    <EvaluationContext.Provider value={{ evaluationData, setEvaluationData }}>
      {children}
    </EvaluationContext.Provider>
  );
};
