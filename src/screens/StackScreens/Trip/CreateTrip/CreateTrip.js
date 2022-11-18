import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

////////////////////app pakaage////////////////////
import DateTimePicker from '@react-native-community/datetimepicker';

////////////paper papkage///////////////
import {Snackbar} from 'react-native-paper';

///////////////////react native navigation///////////////
import { useIsFocused } from '@react-navigation/native';

//////////////app icons///////////
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////////app components///////////////
import CamerBottomSheet from '../../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../../components/Button/CustomButton';
import CustomHeader from '../../../../components/Header/CustomHeader';
import SettingsMenu from '../../../../components/SettingsView/SettingsMenu';
import GuestCards from '../../../../components/CustomCards/GuestCards/GuestCards';
import CarType from '../../../../components/Dropdowns/CarType';
import CarCondition from '../../../../components/Dropdowns/CarCondition';
import CarACSelector from '../../../../components/Dropdowns/ACSelector';
import CustomModal from '../../../../components/Modal/CustomModal';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace,setTripAmount,setTripTotalAmount } from '../../../../redux/actions';
////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////height width pakage/////////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import Inputstyles from '../../../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import { appImages } from '../../../../constant/images';

const CreateTrip = ({navigation,route}) => {

    ////////////isfocused//////////
    const isfocussed = useIsFocused()
        /////////////previous data states////////////
        const [predata] = useState(route.params);

  /////////////////////////redux///////////////////
  const {phone_no,nav_place,user_account_detail,condition,
     car_type,car_AC,car_price,trip_amount,trip_total_amount,car_type_id,condition_id} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();

 //////////////dropdowns states////////////////
 const refCarConditionddRBSheet = useRef();
 const refCarTypeddRBSheet = useRef();
 const refCarACddRBSheet = useRef();

  /////////////////nav state////////////
  const [nav, setnav] = useState(false);

  //////////////link dropdown////////////////
  const refddRBSheet = useRef();
  
  //camera and imagepicker
  const refRBSheet = useRef();
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

   /////////button states/////////////
 const [loading, setloading] = useState(0);
 const [disable, setdisable] = useState(0);
 const [visible, setVisible] = useState(false);
 const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
 const onDismissSnackBar = () => setVisible(false);

  ///////////////API data states////////////////////
  //////////////////Account////////////////
  const [drivernotes, setDriverNotes] = useState('');
  const [pickuploc, setpickuploc] = useState('');
  const [dropoffloc, setdropoffloc] = useState('');

  //////////////////////Api Calling/////////////////
  const CreateTrip = async () => {
    var user= await AsyncStorage.getItem('Userid')
    console.log("order request function",user,user_account_detail,condition_id,car_type_id,car_AC)
    axios({
      method: 'POST',
      url: BASE_URL + 'api/Order/createOrder',
      data: {
        guest_id: user_account_detail,
        'pickup_location': 'Rawalpindi, Pakistan',
        'pickup_log': '73.038080',
        'pickup_lat': '33.601920',
        'dropoff_location': 'Islamabad, Pakistan',
        'dropoff_log': '73.0479',
        'dropoff_lat': '33.6844',
        condition_id: condition_id,
        car_type_id: car_type_id,
        ac:car_AC,
        flight_date: showyearwise,
        driver_notes: drivernotes,
        estimated_amount: trip_amount,
        total_amount: trip_total_amount,
        status: 'schedule',
        cancellation_reason: '',
        canceled_by: '',
        canceled_by_id: '',
        hotel_id: user 

      },
    })
      .then(function (response) {
        console.log('response', JSON.stringify(response.data));
            setloading(0);
          setdisable(0);
          navigation.navigate('FindingDriver')
          //setModalVisible(true)
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  //////////////////////// API forms validations////////////////////////
  const AcountValidation = async () => {
    // input validation
    if (pickuploc == '') {
      setsnackbarValue({value: 'Please Enter PickUp Location', color: 'red'});
      setVisible('true');
    } else if (dropoffloc == '') {
      setsnackbarValue({value: 'Please Enter Dropoff Location', color: 'red'});
      setVisible('true');
    } else if (condition == '') {
      setsnackbarValue({value: 'Please Select Car Condition', color: 'red'});
      setVisible('true');
    } 
    else if (car_type == '') {
      setsnackbarValue({value: 'Please Select Car Type', color: 'red'});
      setVisible('true');
    }
  
    else if (car_AC == '') {
      setsnackbarValue({value: 'Please Select Car AC', color: 'red'});
      setVisible('true');
    }
    else if (showdaywise == '') {
      setsnackbarValue({value: 'Please Enter Flight Date', color: 'red'});
      setVisible('true');
    }
    else if (showTimewise == '') {
      setsnackbarValue({value: 'Please Enter Flight Time', color: 'red'});
      setVisible('true');
    }
    else if (drivernotes == '') {
      setsnackbarValue({value: 'Please Enter Driver Notes', color: 'red'});
      setVisible('true');
    }
    else {
      setloading(1);
      setdisable(1);
      CreateTrip()
    }
  };

  ///////////////API data states////////////////////
  const [guestimage, setGuestImage] = useState('');
  const [guestname, setGuestName] = useState('');
  const [guestemail, setGuestEmail] = useState('');
  const [guestgender, setGuestGender] = useState('');

  /////////////////////////Get Guests Data////////////////////
  const GetGuestsDetail=async() => {
    await axios({
      method: 'GET',
      url: BASE_URL+'api/guest/specificGuest/'+user_account_detail,
    })
    .then(function (response) {
      setGuestImage(response.data[0].img)
      setGuestName(response.data[0].name)
      setGuestEmail(response.data[0].email)
      setGuestGender(response.data[0].gender)
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }

    useEffect(() => {
      if (isfocussed) {
        GetGuestsDetail()
        GetComission()
        GetRateperkm()
    }
  
    }, [isfocussed]);

      /////////////////////////Get Comission Data and state////////////////////
  const [comission, setComission] = useState('');
  const GetComission=async() => {
    await axios({
      method: 'GET',
      url: BASE_URL+'api/comission/allComissions',
    })
    .then(function (response) {
      console.log("response", JSON.stringify(response.data))
      setComission(JSON.parse(response.data.rate))
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }

       /////////////////////////Get Comission Data and state////////////////////
  const [rate_per_km, setRatePerKm] = useState('');
  const GetRateperkm=async() => {
    await axios({
      method: 'GET',
      url: BASE_URL+'api/rate_per_km/allrate_per_kms',
    })
    .then(function (response) {
      console.log("response", JSON.stringify(response.data))
      setRatePerKm(JSON.parse(response.data.rate))
    })
    .catch(function (error) {
      console.log("error", error)
    })
    }

    ////////////////datetime picker states////////////////
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showyearwise, setshowyearwise] = useState(false);
    const [showdaywise, setshowdaywise] = useState('');
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      var d = new Date();
      d = selectedDate
      // console.log(d)
      //console.log(selectedDate)
      if (d != undefined) {
        let year = d.getFullYear();
        let month = (d.getMonth() + 1).toString().padStart(2, "0");
        let day = d.getDate().toString().padStart(2, "0");
        console.log(year + '-' + month + '-' + day);
        console.log(typeof (year + '-' + month + '-' + day))
        setshowyearwise(year + "-" + month + "-" + day)
        setshowdaywise(day + "-" + month + "-" + year)
        //console('date',showyearwise)
      }
    
    }
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
      console.log('mode',mode)
    };
    
    const showDatepicker = () => {
      showMode('date');
    };
///////////////////timepicker function ansd states///////////////////////////
const [time, setTime] = useState(new Date());
  const [modeTime, setModeTime] = useState('date');
  const [showTime, setShowTime] = useState(false);
  const [showTimewise, setshowTimewise] = useState(false);
  const [sendTimewise, setsendTimewise] = useState(false);

const onChangeTime = (event, selectedDate) => {
  const currentDate = selectedDate || time;
  setShowTime(Platform.OS === 'ios');
  setTime(currentDate);
  var d = new Date();
  d = selectedDate
  console.log(selectedDate)
  if (d != undefined) {
      console.log(d)
      setsendTimewise(d)
      //isValidSetStateTime(true)
      //console.log()
      setshowTimewise(d.getHours() + ":" +
       d.getMinutes()+ ":" + d.getSeconds())
  }
};
const showModeTime = (currentMode) => {
  setShowTime(true);
  setModeTime(currentMode);
  console.log('mode',mode)
};

const showTimepicker = () => {
  showModeTime('time');
};
var amnt=''
var totlamnt=''
/////////////////getamount//////////////
const amount =()=>{
amnt=(JSON.parse(rate_per_km) *4)+JSON.parse(car_price)
totlamnt=(JSON.parse(amnt)/100)*JSON.parse(comission)
console.log('amount here:',totlamnt)
  // dispatch(setTripAmount((JSON.parse(rate_per_km) *2)+JSON.parse(car_price))),
  // dispatch(setTripTotalAmount((JSON.parse(trip_amount)/100)*JSON.parse(comission)))
}

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
      {show && (
      <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      display="default"
      locale="es-ES"
      themeVariant="light"
      onChange={onChange}
      style={{
      shadowColor: '#fff',
      shadowRadius: 0,
      shadowOpacity: 1,
      shadowOffset: { height: 0, width: 0 },
      color:'#1669F',
      textColor:'#1669F'
      }}
      />
      )}
        {showTime && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode={modeTime}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                    />
                )}
      <CustomHeader
          headerlabel={'Create Trip'}
          iconPress={() => { navigation.goBack()}}
          icon={'chevron-back'}

        />
          <View style={{flex: 1}}>
   
            <View style={Inputstyles.inputview}>
            { nav_place === 'GuestList' ?
                <GuestCards
                guestlogo={BASE_URL+guestimage}
                guestname={guestname}
                guestemail={guestemail}
                guestgender={guestgender}
                type={'CreateTrip'}
                onpresstype={()=>navigation.navigate('GuestsList',{navplace:'CreateTrip'})}
        
            />
: 
<SettingsMenu
label={'Add Guest'}
labelPress={()=>
{
navigation.navigate('GuestsList',{navplace:'CreateTrip'}),
setnav(true)
}}
/>
}
              <Text style={Inputstyles.inputtoptext}>Enter Location</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('PickupLocation')}>
              <View style={Inputstyles.action}>
                <Ionicons name="location" color={Colors.drawertext} size={25} />
                  <TextInput
                    onChangeText={setpickuploc}
                    placeholder={'Pickup location'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoFocus={true}
                    placeholderTextColor={Colors.inputtextcolor}
                    style={Inputstyles.input}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
        
                <View style={Inputstyles.action}>
                <Ionicons name="location" color={Colors.drawertext} size={25} />
                  <TextInput
                    onChangeText={setdropoffloc}
                    placeholder={'Drop-off location'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      ref_input2.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoFocus={true}
                    placeholderTextColor={Colors.inputtextcolor}
                    style={Inputstyles.input}
                  />
                </View>
              <Text style={Inputstyles.inputtoptext}>Select Car</Text>      
              <TouchableOpacity
                onPress={() => refCarConditionddRBSheet.current.open()}>
              <View style={Inputstyles.action}>
                <TextInput
                  value={condition}
                  placeholderTextColor={'#212121'}
                  placeholderStyle={styles.placeholdertext}
                  style={Inputstyles.input}
                  placeholder={'Car Condition'}
                  editable={false}
                />
                   <Ionicons name='chevron-down' color={'#212121'} size={20}
                  // onPress={labelPress}
                   />
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {refCarTypeddRBSheet.current.open(),
                  dispatch(setTripAmount((rate_per_km *2)+car_price))
                  }}>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_type}
                  placeholderTextColor={'#212121'}
                  style={Inputstyles.input}
                  placeholder={'Car Type'}
                  //onSubmitEditing={()=>amount()}
                  editable={false}
                />
                   <Ionicons name='chevron-down' color={'#212121'} size={20}
                  // onPress={labelPress}
                   />
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {refCarACddRBSheet.current.open(),
                
                 dispatch(setTripTotalAmount((trip_amount/100)*comission))
                   }}>
              <View style={Inputstyles.action}>
                <TextInput
                  value={car_AC}
                  placeholderTextColor={'#212121'}
                  style={Inputstyles.input}
                  placeholder={'AC'}
                  editable={false}
                />
                   <Ionicons name='chevron-down' color={'#212121'} size={20}
                  // onPress={labelPress}
                   />
              </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Date of Flight</Text>
              <TouchableOpacity  onPress={showDatepicker}>
              <View style={Inputstyles.action}>
              <Ionicons name="calendar" color={Colors.drawertext} size={25} />
                <TextInput
                  ref={ref_input3}
                  onChangeText={onChange}
                  value={showdaywise}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input4.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
              </TouchableOpacity>
          
              <Text style={Inputstyles.inputtoptext}>Time of Flight</Text>
              <TouchableOpacity  onPress={showTimepicker}>
              <View style={Inputstyles.action}>
              <Ionicons name="time" color={Colors.drawertext} size={25} />
                <TextInput
                  ref={ref_input4}
                  onChangeText={onChangeTime}
      value={showTimewise}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input5.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  editable={false}
                />
              </View>
              </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Driver Notes</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input7}
                  onChangeText={setDriverNotes}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>
              </View>
              <View style={styles.detailview}>
    <Text style={styles.detailtextleft}> Amount</Text>
    <Text style={styles.detailtextright}>
    {trip_amount}$</Text>
   </View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Comission</Text>
    <Text style={styles.detailtextright}>
   {comission}$</Text>
   </View>
   <View style={styles.lineview}></View>
   <View style={styles.detailview}>
    <Text style={styles.detailtextleft}>Total Amount</Text>
    <Text style={styles.detailtextright}>
   {trip_total_amount} $</Text>
   </View>
            <View style={{marginBottom: hp(2), marginTop: hp(12)}}>
              <CustomButtonhere
                title={'ADD'}
                widthset={'78%'}
                topDistance={0}
                loading={loading}
                disabled={disable}
                onPress={
                  () => AcountValidation()
                  // navigation.navigate('Drawerroute')
                }
              />
            </View>
          </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}

        />
                <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom:'20%',
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
        <CarCondition
          refRBSheet={refCarConditionddRBSheet}
          onClose={() => refCarConditionddRBSheet.current.close()}
        />
        <CarType
          refRBSheet={refCarTypeddRBSheet}
          onClose={() => refCarTypeddRBSheet.current.close()}
        />
         <CarACSelector
          refRBSheet={refCarACddRBSheet}
          onClose={() => refCarACddRBSheet.current.close()}
        />
           <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Account Verified Successfully'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),navigation.navigate('BottomTab')}}
                /> 
      </SafeAreaView>
    </ScrollView>
  );
};

export default CreateTrip;
