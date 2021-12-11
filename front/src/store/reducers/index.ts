import {combineReducers} from 'redux'

const initState = {
  carWashes: []
}

const carWashesReducer = (state = initState, action: any) => {
  switch(action.type) {
    case 'SET_ALL_CAR_WASHES': {
      return {
        ...state, carWashes: action.payload
      }
    }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  carWashesReducer
})