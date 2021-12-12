import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'

const getCarWashes = async(): Promise<any> => {
  try {
    const request = await axios.get<any>('http://localhost:3001/api/wash/all')
    return request.data
  } catch(err) {
    return err
  }
}

const searchFilter = async(position: any, filters: any): Promise<any> => {
  try {
    const request = await axios.post<any>('http://localhost:3001/api/wash/filter', {position, filters})
    return request.data
  } catch(err) {
    return err
  }
}

const getOneCarWash = async(carWashId: number): Promise<any> => {
  console.log(`12`, 12)
  try {
    const request = await axios.get<any>(`http://localhost:3001/api/wash/${carWashId}/times`, )
    return request.data
  } catch(err) {
    return err
  }
}


const bookCarWashTime = async(carWashId: number, time: any, numCar: string, boxNum: string): Promise<any> => {
  try {
    const request = await axios.post<any>(`http://localhost:3001/api/wash/${carWashId}/book`, {
      time,
      num_car: numCar,
      num_box: boxNum
    })
    return request.data
  } catch(err) {
    return err
  }
}

const getMyCarWashTime = async(carNum: string): Promise<any> => {
  try {
    const request = await axios.get<any>(`http://localhost:3001/api/books?num_car=${carNum}`)
    
    return request.data
  } catch(err) {
    return err
  }
}

const cancelMyCarWashTime = async(bookNum: string): Promise<any> => {
  try {
    const request = await axios.get<any>(`http://localhost:3001/api/books/${bookNum}`)
    
    return request.data
  } catch(err) {
    return err
  }
}

function* getAllCarWashesSaga() {
  try {
    const data: AxiosResponse<any> = yield call(getCarWashes)
    yield put({type: 'SET_ALL_CAR_WASHES', payload: data});
  } catch (err) {
    yield put({type: 'SET_CAR_WASHES_ERROR'})
  }
}


function* searchFilterSaga(payload: any) {
  try {
    const {position, filters} = payload.payload
    const data: AxiosResponse<any> = yield call(searchFilter, position, filters)
    yield put({type: 'SET_FINDED_CAR_WASHES', payload: data});
  } catch (err) {
    yield put({type: 'SET_FINDED_CAR_WASHES_ERROR'})
  }
}

function* getCarWashInfo(payload: any) {
  try {
    const { carWashId } = payload.payload;
    const data: AxiosResponse<any> = yield call(getOneCarWash, carWashId)
    yield put({type: 'SET_CAR_WASH_INFO', payload: data});
  } catch (err) {
    yield put({type: 'SET_CAR_WASH_INFO_ERROR'})
  }
}

function* bookCarWashTimeSaga(payload: any) {
  try {
    const { carWashId, time, numCar, boxNum } = payload.payload;
    const data: AxiosResponse<any> = yield call(bookCarWashTime, carWashId, time, numCar, boxNum)
    yield put({type: 'SET_BOOK_CAR_WASH', payload: data});
  } catch (err) {
    yield put({type: 'SET_BOOK_CAR_WASH_ERROR'})
  }
}

function* getMyCarWashTimeSaga(payload: any) {
  try {
    const { carNum } = payload.payload;
    const data: AxiosResponse<any> = yield call(getMyCarWashTime, carNum)
    yield put({type: 'SET_BOOKED_CAR_WASH_TIME', payload: data});
  } catch (err) {
    yield put({type: 'SET_BOOKED_CAR_WASH_TIME_ERROR'})
  }
}

function* cancelMyCarWashTimeSaga(payload: any) {
  try {
    const { bookNum } = payload.payload;
    const data: AxiosResponse<any> = yield call(cancelMyCarWashTime, bookNum)
    yield put({type: 'CANCEL_BOOKED_CAR_WASH_TIME', payload: data});
  } catch (err) {
    yield put({type: 'CANCEL_BOOKED_CAR_WASH_TIME_ERROR'})
  }
}

function* watchGetCarWashesSaga() {
  yield takeEvery('GET_ALL_CAR_WASHES', getAllCarWashesSaga);
}

function* watchFindCarWashesSaga() {
  yield takeEvery('FIND_CAR_WASHES', searchFilterSaga);
}

function* watchFindCarWashSaga() {
  yield takeEvery('FIND_CAR_WASH', getCarWashInfo);
}

function* watchBookCarWashTimeSaga() {
  yield takeEvery('BOOK_CAR_WASH', bookCarWashTimeSaga);
}

function* watchGetMyCarWashTimeSaga() {
  yield takeEvery('GET_MY_CAR_WASH_TIME', getMyCarWashTimeSaga);
}

function* watchCancelMyCarWashTimeSaga() {
  yield takeEvery('CANCEL_MY_CAR_WASH_TIME', cancelMyCarWashTimeSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetCarWashesSaga),
    fork(watchFindCarWashesSaga),
    fork(watchFindCarWashSaga),
    fork(watchBookCarWashTimeSaga),
    fork(watchGetMyCarWashTimeSaga),
    fork(watchCancelMyCarWashTimeSaga)
  ]);
}

