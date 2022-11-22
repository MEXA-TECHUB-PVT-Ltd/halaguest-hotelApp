
 ////////////////APP STATES/////////////////////
export const SET_HOTEL_TYPE = 'SET_HOTEL_TYPE';

////////////////////Account Data Submition////////////////
export const SET_HOTEL_SUBMIT_ID = 'SET_HOTEL_SUBMIT_ID';
export const SET_PAYMENT_SUBMIT_ID = 'SET_PAYMENT_SUBMIT_ID';

////////////////////////VEHICLE///////////////
export const SET_CAR_CONDITION = 'SET_CAR_CONDITION';
export const SET_CAR_CONDITION_ID = 'SET_CAR_CONDITION_ID';
export const SET_CAR_TYPE = 'SET_CAR_TYPE';
export const SET_CAR_TYPE_ID = 'SET_CAR_TYPE_ID';
export const SET_CAR_PRICE = 'SET_CAR_PRICE';
export const SET_CAR_MAKE = 'SET_CAR_MAKE';
export const SET_CAR_YEAR = 'SET_CAR_YEAR';
export const SET_CAR_AC = 'SET_CAR_AC';

//////////////////IMAGES/////////////////
export const SET_USER_IMAGE= 'SET_USER_IMAGE';
export const EDIT_USER_IMAGE= 'EDIT_USER_IMAGE';

/////////////////////NavPlace///////////////////
export const SET_NAV_PLACE= 'SET_NAV_PLACE';

  ////////////////APP STATES/////////////////////
     ////////////////APP LOGIN STATES/////////////////////
     export const SET_LOGIN_USER = 'SET_LOGIN_USER';
     export const SET_PHONE_NO = 'SET_PHONE_NO';
  ///////////////User Login Info///////////////
  export const setLoginUser = login_user_id => dispatch => {
    dispatch({
        type: SET_LOGIN_USER,
        payload: login_user_id,
    });
};
export const setPhoneNumber = phone_no => dispatch => {
    dispatch({
        type: SET_PHONE_NO,
        payload: phone_no,
    });
};


////////////////////Account creation////////////////
export const setHotelType = hoteltype => dispatch => {
    dispatch({
        type: SET_HOTEL_TYPE,
        payload: hoteltype,
    });
};

////////////////////Account Data Submition////////////////
export const setHotelSubmitId = hotel_submit_id => dispatch => {
    dispatch({
        type: SET_HOTEL_SUBMIT_ID,
        payload: hotel_submit_id,
    });
};

export const setPaymentSubmitId = payment_submit_id => dispatch => {
    dispatch({
        type: SET_PAYMENT_SUBMIT_ID,
        payload: payment_submit_id,
    });
};


//////////////////////Car Info//////////////////
export const setCarCondition = condition => dispatch => {
    dispatch({
        type: SET_CAR_CONDITION,
        payload: condition,
    });
};
export const setCarConditionId = condition_id => dispatch => {
    dispatch({
        type: SET_CAR_CONDITION_ID,
        payload: condition_id,
    });
};
export const setCarType = car_type => dispatch => {
    dispatch({
        type: SET_CAR_TYPE,
        payload: car_type,
    });
};
export const setCarTypeId = car_type_id => dispatch => {
    dispatch({
        type: SET_CAR_TYPE_ID,
        payload: car_type_id,
    });
};
export const setCarPrice = car_price=> dispatch => {
    dispatch({
        type: SET_CAR_PRICE,
        payload: car_price,
    });
};
export const setCarMake = car_make => dispatch => {
    dispatch({
        type: SET_CAR_MAKE,
        payload: car_make,
    });
};
export const setCarYear = car_year => dispatch => {
    dispatch({
        type: SET_CAR_YEAR,
        payload: car_year,
    });
};
export const setCarAC = car_AC => dispatch => {
    dispatch({
        type: SET_CAR_AC,
        payload: car_AC,
    });
};
//////////////////////images Info//////////////////

export const setUserImage = user_image => dispatch => {
    dispatch({
        type: SET_USER_IMAGE,
        payload: user_image,
    });
};

export const editUserImage = edit_user_image => dispatch => {
    dispatch({
        type: EDIT_USER_IMAGE,
        payload: edit_user_image,
    });
};


///////////////Navigation place for camera picker///////////////////////
export const setNavPlace = nav_place => dispatch => {
    dispatch({
        type: SET_NAV_PLACE,
        payload: nav_place,
    });
};


/////////////////////////API CALLING//////////////////
export const GET_ACCOUNT_DETAIL = 'GET_ACCOUNT_DETAIL';
export const setGuestDetails = user_account_detail => dispatch => {
    dispatch({
        type: GET_ACCOUNT_DETAIL,
        payload: user_account_detail,
    });
};

/////////////////////////TRIP AMOUNT AND TOTAL AMOUNT//////////////////
export const SET_TRIP_AMOUNT = 'SET_TRIP_AMOUNT';
export const setTripAmount = trip_amount => dispatch => {
    dispatch({
        type: SET_TRIP_AMOUNT,
        payload: trip_amount,
    });
};
export const SET_TRIP_TOTAL_AMOUNT = 'SET_TRIP_TOTAL_AMOUNT';
export const setTripTotalAmount = trip_total_amount => dispatch => {
    dispatch({
        type: SET_TRIP_TOTAL_AMOUNT,
        payload: trip_total_amount,
    });
};

  ////////////////APP STATES/////////////////////
     ////////////////APP LOGIN STATES/////////////////////
     export const SET_PICKUP_LOCATION_LAT = 'SET_PICKUP_LOCATION_LAT';
     export const SET_PICKUP_LOCATION_LNG = 'SET_PICKUP_LOCATION_LNG';
     export const SET_PICKUP_LOCATION_ADDRESS = 'SET_PICKUP_LOCATION_ADDRESS';
     export const SET_DROPOFF_LOCATION_LAT = 'SET_DROPOFF_LOCATION_LAT';
     export const SET_DROPOFF_LOCATION_LNG = 'SET_DROPOFF_LOCATION_LNG';
     export const SET_DROPOFF_LOCATION_ADDRESS = 'SET_DROPOFF_LOCATION__ADDRESS';
  ///////////////User Login Info///////////////
  export const setPickupLocationLat = pickup_location_lat => dispatch => {
    dispatch({
        type: SET_PICKUP_LOCATION_LAT,
        payload: pickup_location_lat,
    });
};
export const setPickupLocationLng = pickup_location_lng => dispatch => {
    dispatch({
        type: SET_PICKUP_LOCATION_LNG,
        payload: pickup_location_lng,
    });
};
export const setPickupLocationAddress = pickup_location_address => dispatch => {
    dispatch({
        type: SET_PICKUP_LOCATION_ADDRESS,
        payload: pickup_location_address,
    });
};
export const setDropoffLocationLat = dropoff_location_lat => dispatch => {
    dispatch({
        type: SET_DROPOFF_LOCATION_LAT,
        payload: dropoff_location_lat,
    });
};
export const setDropoffLocationLng = dropoff_location_lng => dispatch => {
    dispatch({
        type: SET_DROPOFF_LOCATION_LNG,
        payload: dropoff_location_lng,
    });
};

export const setDropoffLocationAddress = dropoff_location_address => dispatch => {
    dispatch({
        type: SET_DROPOFF_LOCATION_ADDRESS,
        payload: dropoff_location_address,
    });
};