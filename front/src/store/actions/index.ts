export const getAllCarWashes = () => ({
  type: 'GET_ALL_CAR_WASHES'
})

export const setAllCarWashes= (data: any) => ({
  type: 'SET_ALL_CAR_WASHES', 
  payload: data
})