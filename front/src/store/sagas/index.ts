import { call, put, takeEvery } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { positions } from '@mui/system'

const getCarWashes = async(): Promise<any> => {
  try {
    const request = await axios.get<any>('http://localhost:3001/api/wash/all')
    return request.data
  } catch(err) {
    return err
  }
}

const searchFilter = async(position: any, filters: any): Promise<any> => {
  // const {position, filters } = payload;
  try {
    const request = await axios.post<any>('http://localhost:3001/api/wash/filter', {position, filters})
    return request.data
  } catch(err) {
    return err
  }
}

function* getAllCarWashesSaga() {
  try {
    const data: AxiosResponse<any> = yield call(getCarWashes)
    console.log(`data`, data)
    yield put({type: 'SET_ALL_CAR_WASHES', payload: data});
  } catch (err) {
    yield put({type: 'SET_CAR_WASHES_ERROR'})
  }
}


function* searchFilterSaga(payload: any) {
  try {
    const {position, filters} = payload.payload
    console.log(`positoin,`, position, filters)
    const data: AxiosResponse<any> = yield call(searchFilter, position, filters)
    yield put({type: 'SET_FINDED_CAR_WASHES', payload: data});
  } catch (err) {
    yield put({type: 'SET_FINDED_CAR_WASHES_ERROR'})
  }
}

export default function* watchCarWashesSaga() {
  yield takeEvery('GET_ALL_CAR_WASHES', getAllCarWashesSaga);
  yield takeEvery('FIND_CAR_WASHES', searchFilterSaga);

}
