export const getAllCarWashes = () => ({
  type: "GET_ALL_CAR_WASHES",
});

export const setAllCarWashes = (data: any) => ({
  type: "SET_ALL_CAR_WASHES",
  payload: data,
});

export const filterSearch = (data: any) => ({
  type: "FIND_CAR_WASHES",
  payload: data,
});

export const getCarWash = (data: any) => ({
  type: "FIND_CAR_WASH",
  payload: data,
});

export const bookCarWash = (data: any) => ({
  type: "BOOK_CAR_WASH",
  payload: data,
});

export const getMyCarWashTime= (data: any) => {
  console.log(`data`, data)
  return {
    type: "GET_MY_CAR_WASH_TIME",
    payload: data,

  }
};