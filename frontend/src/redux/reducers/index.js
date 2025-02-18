import {combineReducers} from 'redux';
import EvaluateReducer from './evaluateReducer';

const rootReducer = combineReducers(
    {
        evaluateReducer: EvaluateReducer,
    }
)

export default rootReducer;