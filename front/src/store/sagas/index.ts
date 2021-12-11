import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'

const getCarWashes = async(): Promise<any> => {
  try {
    const request = await axios.get<any>('localhost:3001/api/')
    return request.data
  } catch(err) {
    return err
  }
}

function* getAllCarWashes() {
  try {
    const data: AxiosResponse<any> = yield call(getCarWashes)
    yield put({type: 'SET_CAR_WASHES', payload: data});
  } catch (err) {
    yield put({type: 'SET_CAR_WASHES_ERROR'})
  }
}


export default function* watchCarWashesSaga() {
  yield takeEvery('GET_ALL', getAllCarWashes);
 
}
