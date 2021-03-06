import { combineReducers } from "redux";
const initState = {
  carWashes: [],
  carWashFreeTime: {},
  myCarWashes: []
};
const carWashesReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_ALL_CAR_WASHES": {
      return {
        ...state,
        carWashes: action.payload,
      };
    }
    case "SET_FINDED_CAR_WASHES": {
      return {
        ...state,
        carWashes: action.payload,
      };
    }
    case "SET_CAR_WASH_INFO": {
      return {
        ...state,
        carWashFreeTime: action.payload,
      };
    }
    case "SET_BOOKED_CAR_WASH_TIME" : {
      return {
        ...state,
        myCarWashes: action.payload,
      };
    }
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  carWashesReducer,
});

