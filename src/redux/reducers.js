import {
  ////////////////APP LOGIN STATES/////////////////////
  SET_LOGIN_USER,
  SET_PHONE_NO,

  ////////////////APP STATES/////////////////////
  SET_HOTEL_TYPE,

  ////////////////////Account Data Submition////////////////
  SET_HOTEL_SUBMIT_ID,
 SET_PAYMENT_SUBMIT_ID ,

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
 SET_TRIP_TOTAL_AMOUNT


} from './actions';

const initialState = {

  ////////////////APP LOGIN STATES/////////////////////
  login_user_id: '',
  phone_no: '',

  ////////////////APP STATES/////////////////////
  hoteltype: '',
  phone_no: '',

    ////////////////////Account Data Submition////////////////
    hotel_submit_id:'',
    payment_submit_id:'',

  ////////////VEHICLE////////////
  condition: '',
  condition_id :'',
  car_type: '',
  car_type_id:'',
  car_price:'',
  car_make: '',
  car_year: '',
  car_AC:'',

  ////////////////IMAGES////////////
  user_image: '',
  edit_user_image: '',

  //////////////////NAV PLACE//////////////
  nav_place: '',

      ////////////////api user detail//////////////
user_account_detail:'',
trip_amount:'',
trip_total_amount:'',

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
      case  GET_ACCOUNT_DETAIL:
      return { ...state, user_account_detail: action.payload };

      //////////////// trip amount and total amount//////////////
       case  SET_TRIP_AMOUNT:
       return { ...state, trip_amount: action.payload };
       case  SET_TRIP_TOTAL_AMOUNT:
        return { ...state, trip_total_amount: action.payload };

    default:
      return state;
  }
}

export default userReducer;
