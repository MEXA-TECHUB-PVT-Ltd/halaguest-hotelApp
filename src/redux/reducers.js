import {
  ////////////////APP LOGIN STATES/////////////////////
  SET_LOGIN_USER,
  SET_PHONE_NO,

  ////////////////APP STATES/////////////////////
  SET_HOTEL_TYPE,
  SET_HOTEL_TYPE_ID,

  ////////////////////Account Data Submition////////////////
  SET_HOTEL_SUBMIT_ID,
  SET_PAYMENT_SUBMIT_ID,

  ////////////VEHICLE////////////
  SET_CAR_CONDITION,
  SET_CAR_CONDITION_ID,
  SET_CAR_TYPE,
  SET_CAR_TYPE_ID,
  SET_CAR_PRICE,
  SET_CAR_MAKE,
  SET_CAR_YEAR,
  SET_CAR_AC,

  ///////////////IMAGES//////////////
  SET_USER_IMAGE,
  EDIT_USER_IMAGE,
  /////////////////NAV PLACE///////////////
  SET_NAV_PLACE,

  ////////////////api user detail//////////////
  GET_ACCOUNT_DETAIL,

  ////////////////Trip Amount detail//////////////
  SET_TRIP_AMOUNT,
  SET_TRIP_TOTAL_AMOUNT,

  ////////////////Order Location detail//////////////
  SET_PICKUP_LOCATION_LAT,
  SET_PICKUP_LOCATION_LNG,
  SET_PICKUP_LOCATION_ADDRESS,
  SET_DROPOFF_LOCATION_LAT,
  SET_DROPOFF_LOCATION_LNG,
  SET_DROPOFF_LOCATION_ADDRESS,

  ////////////////Locations STATES/////////////////////
  SET_COUNTRY_NAME,
  SET_COUNTRY_ID,
  SET_STATE_NAME,
  SET_STATE_ID,
  SET_CITY_NAME,
  SET_CITY_ID,

  //////////////////////////order status///////////
  SET_SCHEDULE_STATUS,
  SET_ONGOING_STATUS,
  SET_COMPLETED_STATUS,
  SET_CANCEL_STATUS,
} from './actions';

const initialState = {
  ////////////////APP LOGIN STATES/////////////////////
  login_user_id: '',
  phone_no: '',

  ////////////////APP STATES/////////////////////
  hoteltype: '',
  hoteltype_id: '',

  ////////////////////Account Data Submition////////////////
  hotel_submit_id: '',
  payment_submit_id: '',

  ////////////VEHICLE////////////
  condition: '',
  condition_id: '',
  car_type: '',
  car_type_id: '',
  car_price: '',
  car_make: '',
  car_year: '',
  car_AC: '',

  ////////////////IMAGES////////////
  user_image: '',
  edit_user_image: '',

  //////////////////NAV PLACE//////////////
  nav_place: '',

  ////////////////api user detail//////////////
  user_account_detail: '',

  ////////////////Order Trip detail//////////////
  trip_amount: '',
  trip_total_amount: '',

  ////////////////Order Location detail//////////////
  pickup_location_lat: '',
  pickup_location_lng: '',
  pickup_location_address: '',
  dropoff_location_lat: '',
  dropoff_location_lng: '',
  dropoff_location_address: '',

  ////////////////Locations STATES/////////////////////
  country_name: '',
  country_id: '',
  state_name: '',
  state_id: '',
  city_name: '',
  city_id: '',

  ////////////////ORDER STATUS////////////
  schedule_status: true,
  ongoing_status: false,
  completed_status: false,
  cancel_status: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    ////////////////APP LOGIN STATES/////////////////////
    case SET_LOGIN_USER:
      return {...state, login_user_id: action.payload};
    case SET_PHONE_NO:
      return {...state, phone_no: action.payload};

    ////////////////APP STATES/////////////////////
    case SET_HOTEL_TYPE:
      return {...state, hoteltype: action.payload};
    case SET_HOTEL_TYPE_ID:
      return {...state, hoteltype_id: action.payload};

    ////////////////////Account Data Submition////////////////
    case SET_HOTEL_SUBMIT_ID:
      return {...state, hotel_submit_id: action.payload};
    case SET_PAYMENT_SUBMIT_ID:
      return {...state, payment_submit_id: action.payload};

    ////////////////VEHICLE////////////////
    case SET_CAR_CONDITION:
      return {...state, condition: action.payload};
    case SET_CAR_CONDITION_ID:
      return {...state, condition_id: action.payload};
    case SET_CAR_TYPE_ID:
      return {...state, car_type_id: action.payload};
    case SET_CAR_TYPE:
      return {...state, car_type: action.payload};
    case SET_CAR_PRICE:
      return {...state, car_price: action.payload};
    case SET_CAR_MAKE:
      return {...state, car_make: action.payload};
    case SET_CAR_YEAR:
      return {...state, car_year: action.payload};
    case SET_CAR_AC:
      return {...state, car_AC: action.payload};

    ////////////////IMAGES/////////////
    case SET_USER_IMAGE:
      return {...state, user_image: action.payload};
    case EDIT_USER_IMAGE:
      return {...state, edit_user_image: action.payload};

    /////////////////////NAV PLACE////////////
    case SET_NAV_PLACE:
      return {...state, nav_place: action.payload};

    ////////////////api user detail//////////////
    case GET_ACCOUNT_DETAIL:
      return {...state, user_account_detail: action.payload};

    ////////////////Order trip amount and total amount//////////////
    case SET_TRIP_AMOUNT:
      return {...state, trip_amount: action.payload};
    case SET_TRIP_TOTAL_AMOUNT:
      return {...state, trip_total_amount: action.payload};

    ////////////////Order Location Detail//////////////
    case SET_PICKUP_LOCATION_LAT:
      return {...state, pickup_location_lat: action.payload};
    case SET_PICKUP_LOCATION_LNG:
      return {...state, pickup_location_lng: action.payload};
    case SET_PICKUP_LOCATION_ADDRESS:
      return {...state, pickup_location_address: action.payload};
    case SET_DROPOFF_LOCATION_LAT:
      return {...state, dropoff_location_lat: action.payload};
    case SET_DROPOFF_LOCATION_LNG:
      return {...state, dropoff_location_lng: action.payload};
    case SET_DROPOFF_LOCATION_ADDRESS:
      return {...state, dropoff_location_address: action.payload};

    ////////////////Locations STATES/////////////////////
    case SET_COUNTRY_NAME:
      return {...state, country_name: action.payload};
    case SET_COUNTRY_ID:
      return {...state, country_id: action.payload};
    case SET_STATE_NAME:
      return {...state, state_name: action.payload};
    case SET_STATE_ID:
      return {...state, state_id: action.payload};
    case SET_CITY_NAME:
      return {...state, city_name: action.payload};
    case SET_CITY_ID:
      return {...state, city_id: action.payload};

    //////////////////////ORDER STATUS////////////
    case SET_SCHEDULE_STATUS:
      return {...state, schedule_status: action.payload};
    case SET_ONGOING_STATUS:
      return {...state, ongoing_status: action.payload};
    case SET_COMPLETED_STATUS:
      return {...state, completed_status: action.payload};
    case SET_CANCEL_STATUS:
      return {...state, cancel_status: action.payload};

    default:
      return state;
  }
}

export default userReducer;
