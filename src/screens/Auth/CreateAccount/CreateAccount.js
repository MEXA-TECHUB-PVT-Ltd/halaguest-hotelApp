import React, { useEffect, useState, useRef } from 'react';
import {
 StatusBar, ImageBackground,SafeAreaView,ScrollView,
    Image, View, Text, TouchableOpacity, TextInput
} from 'react-native';

////////////paper papkage///////////////
import {Snackbar} from 'react-native-paper';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';

////////////////Custom DropDowns///////////
import HotelTypes from '../../../components/Dropdowns/HotelTypes';
import CountryDropDown from '../../../components/Dropdowns/Location/Country';
import StateDropDown from '../../../components/Dropdowns/Location/State';
import CityDropDown from '../../../components/Dropdowns/Location/City';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setNavPlace,setLoginUser } from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////height width pakage/////////////////////
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import { appImages } from '../../../constant/images';

/////////////////fcmtoken////////////////
import { checkPermission } from '../../../api/FCMToken';


const CreateAccount = ({ navigation,route }) => {
  
    ////////////prevous data States///////////////
    const [predata] = useState(route.params);

    //////////////////redux states/////////////////
    const { hoteltype,phone_no,user_image,country_name,state_name,city_name,hoteltype_id } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

   //////////////link dropdown////////////////
   const refddRBSheet = useRef();
   const refCountryddRBSheet=useRef();
   const refStateddRBSheet=useRef();
   const refCityddRBSheet=useRef();

    //camera and imagepicker/////////////////
  const refRBSheet = useRef();

    ///////////////Modal States///////////////
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

  ///////////////data states////////////////////
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [city,  setCity] = React.useState();
  const [state,  setState] = React.useState();
  const [zipcode,  setZipcode] = React.useState();
  const [country,  setCountry] = React.useState();
  const [street_address,  setStreet_address] = React.useState();
  const[FCMToken,setFCMToken]=useState()
  
   ///////////email//////////////////
 const handleValidEmail = (val) => {
  let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
  if (reg.test(val)) {
      console.log('true')
      return true;
  }
  else {
      console.log('falsse')
      return false;
  }
}

 //////////////////////Api Calling/////////////////
 const CreateAcount = async() => {
  var user= await AsyncStorage.getItem('Userid')
  var date=new Date()
  console.log("userid:",date,user_image,user)

    axios({
      method: 'PUT',
      url: BASE_URL + 'api/hotel/updateHotel',
      data: {
        _id:user,
        hotel_name: name,
        hotel_type_id:hoteltype_id,
        img: user_image,
        email: email,
        country: country_name,
        city: city_name===''?state_name:city_name,
        state: state_name,
        zip_code: zipcode,
        street_address: street_address,
        name: name,
        phoneNo: phone_no,
        created_at:date,
        //status: 'block',
        device_token: FCMToken
      },
    })
      .then(async function (response) {
        console.log("Account data response", JSON.stringify(response.data))
        // setloading(0);
        // setdisable(0);
        setModalVisible(true)
      })
      .catch(function (error) {
        console.log("error", error)
      })
  }
  //////////////////////// API forms validations////////////////////////
  const AcountValidation = async () => {
    // input validation
    if (name == '') {
      setsnackbarValue({value: 'Please Enter Comapany name', color: 'red'});
      setVisible('true');
    } else if (email == '') {
      setsnackbarValue({value: 'Please Enter Email', color: 'red'});
      setVisible('true');
    } else if (!handleValidEmail(email)) {
      setsnackbarValue({value: 'Incorrect Email', color: 'red'});
      setVisible('true');
    }    else if (country_name == '') {
      setsnackbarValue({value: 'Please Enter Country', color: 'red'});
      setVisible('true');
    }    else if (state_name == '') {
      setsnackbarValue({value: 'Please Enter State', color: 'red'});
      setVisible('true');
    }else if (city_name == '') {
      setsnackbarValue({value: 'Please Enter City', color: 'red'});
      setVisible('true');
    } 

    else if (zipcode == '') {
      setsnackbarValue({value: 'Please Enter Zipcode', color: 'red'});
      setVisible('true');
    }
 
    else if (street_address == '') {
      setsnackbarValue({value: 'Please Enter Street Address', color: 'red'});
      setVisible('true');
    }
    else {
      // setloading(1);
      // setdisable(1);
      CreateAcount()
    }
  };
  useEffect(() => {
             checkPermission().then(result => {
          setFCMToken(result)
          })
  },[]);

    return (
      <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.container}> 
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
                headerlabel={'Create Account'}
                iconPress={() => { navigation.goBack() }}
                icon={'chevron-back'}
              />  
     <TouchableOpacity onPress={() =>
                             {refRBSheet.current.open(),
                                dispatch(setNavPlace('Account_Detail'))
                                }
                 }>
              <View style={styles.userimage}>
                {user_image != '' ? (
                  <Image
                    source={{uri: BASE_URL+user_image}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={appImages.User}
                    style={{width: wp(12), height: hp(8)}}
                    resizeMode="contain"
                  />
                )}

                <Image
                  source={appImages.Camera}
                  style={{
                    width: wp(10),
                    height: hp(5),
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
<View style={Inputstyles.inputview}>
<Text style={Inputstyles.inputtoptext}>Hotel name</Text>
              <View style={Inputstyles.action}>
                  <TextInput
                  // value={hoteltype}
                  onChangeText={setName}
                    placeholderTextColor={Colors.inputtextcolor}
                    style={Inputstyles.input}
                    //editable={false}
                  />
                </View>
              <Text style={Inputstyles.inputtoptext}>Hotel Type</Text>
              <TouchableOpacity onPress={()=>refddRBSheet.current.open()}>
              <View style={Inputstyles.action}>
                  <TextInput
                  value={hoteltype}
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
           
              <Text style={Inputstyles.inputtoptext}>Email</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input2}
                  onChangeText={setEmail}
                  placeholderTextColor={Colors.inputtextcolor}
                  autoCapitalize="none"
                  keyboardType='email-address'
                  style={Inputstyles.input}
                />
              </View>

              <Text style={Inputstyles.inputtoptext}>Country</Text>
          <TouchableOpacity
                onPress={() => refCountryddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                  value={country_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
          </TouchableOpacity>
          <Text style={Inputstyles.inputtoptext}>State</Text>
          <TouchableOpacity
                onPress={() => refStateddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                 value={state_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
          </TouchableOpacity>
          <Text style={Inputstyles.inputtoptext}>City</Text>
          <TouchableOpacity
                onPress={() => refCityddRBSheet.current.open()}>
          <View style={Inputstyles.action}>
            <TextInput
                  value={city_name}
              placeholderTextColor={Colors.inputtextcolor}
              style={Inputstyles.input}
              editable={false}
            />
          </View>
        </TouchableOpacity>
              <Text style={Inputstyles.inputtoptext}>Zip_Code</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input5}
                  onChangeText={setZipcode}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    ref_input6.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                  keyboardType={'number-pad'}
                />
              </View>
         
              <Text style={Inputstyles.inputtoptext}>Street Address</Text>
              <View style={Inputstyles.action}>
                <TextInput
                  ref={ref_input6}
                  onChangeText={setStreet_address}
                  placeholderTextColor={Colors.inputtextcolor}
                  style={Inputstyles.input}
                />
              </View>

            </View>
        
        <View style={{ marginBottom: hp(2), 
            marginTop: hp(12) }}>
            <CustomButtonhere
              title={'NEXT'}
              widthset={'78%'}
              topDistance={0}
              loading={loading}
              disable={disable}
              onPress={() => 
                AcountValidation()
               // navigation.navigate('Drawerroute')
              }
            />
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
              <HotelTypes
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
          title={'From Gallery'}
        />
                  <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.CheckCircle}
                text={'Account Created Successfully'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),navigation.navigate('BottomTab')}}
                /> 

<CountryDropDown
          refRBSheet={refCountryddRBSheet}
          onClose={() => refCountryddRBSheet.current.close()}
        />
                         <StateDropDown
          refRBSheet={refStateddRBSheet}
          onClose={() => refStateddRBSheet.current.close()}
        />
                         <CityDropDown
          refRBSheet={refCityddRBSheet}
          onClose={() => refCityddRBSheet.current.close()}
        />
    </SafeAreaView>
</ScrollView>
    )
};

export default CreateAccount;