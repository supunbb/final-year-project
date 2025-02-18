import React from "react";
import { connect } from "react-redux";
import { fetchEvaluate } from "../redux/actions/evaluateAction";

const EvaluateButton = ({ fetchEvaluate, filteredSchema, evaluateResponse }) => {
  const handleEvaluate = () => {
    fetchEvaluate(evaluateResponse);
  };

  return (
    <button
      className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={filteredSchema.length === 0}
      onClick={handleEvaluate}
    >
      Evaluate
    </button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchEvaluate: (evaluateResponse) => dispatch(fetchEvaluate(evaluateResponse)), // Ensure dispatching correctly
});

export default connect(null, mapDispatchToProps)(EvaluateButton);
