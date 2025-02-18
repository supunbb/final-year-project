import { EVALUATE_BUTTON_CLICKED } from "./types";

// import { handleLogin } from "../../api/loginApi";

// export const fetchEvaluate = (values) => async (dispatch) => {
//     try {
//     //   const response = await handleLogin(values);
//       dispatch({
//         type: EVALUATE_BUTTON_CLICKED,
//         payload: [],
//       });
//     } catch (error) {
//       console.error("Error fetching Login data:", error);
//     }
//   };

export const fetchEvaluate = (evaluateResponse) => {
  return {
    type: EVALUATE_BUTTON_CLICKED,
    payload: evaluateResponse,
  };
};