import React,{useState,useEffect,useRef} from 'react';
// Import required components
import {SafeAreaView, StyleSheet,TextInput,  Animated,ScrollView,Image,
     View,Text,TouchableOpacity,ActivityIndicator,TouchableHighlight
} from 'react-native';

//////////////////app components////////////////
import CustomButtonhere from '../../../../components/Button/CustomButton';
import OrdersCards from '../../../../components/CustomCards/OrderCards/Orders';
import CustomModal from '../../../../components/Modal/CustomModal';
import ReasonModal from '../../../../components/Modal/ReasonModal';

//////////////app pakages////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker,PROVIDER_GOOGLE,AnimatedRegion } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapKeyApi } from '../../../../utills/MapKey';

//////////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
 
////////////////app redux///////////
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../../../redux/actions';


//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////app images/////////////////
import { appImages } from '../../../../constant/images';


const PickupLocation = ({navigation}) => {

  ////////////////////redux/////////////////////
  const { theme ,maptheme} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();  

          //////////locationtype state/////////////
          const refRBSheet = useRef();  

              
      //Modal States
      const [modalVisible, setModalVisible] = useState(false);
      const [modalVisible1, setModalVisible1] = useState(false);
      const [modalVisible2, setModalVisible2] = useState(false);

    ////////////isfocused//////////
    const isfocussed = useIsFocused()


    //////////////////////map default location///////////////////
    const defaultlocation =()=>{
      //setuserloc(true)
      setPinLat(56.002716)
      setPinLog(-4.580081)
      setusercurrloc(false)

    }

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);


  const _map = React.useRef(null);

  /////////////map states////////////
  const [mapmargin, setMapMargin]=useState(1)
    const [eror, setError]=useState()
const [region, setRegion] = useState();
const [marker, setMarker] = useState('');
const [pinlat, setPinLat] = useState(56.002716);
const [pinlog, setPinLog] = useState(-4.580081);
const [userloc, setuserloc] = useState(false);


////////////////usercurrrent location///////////
const [usercurrloc, setusercurrloc] = useState(false);

////////////////All location///////////
const [allloc, setAllloc] = useState(false);

/////////////user current location////////////////
const GetcurrLocation=()=>{
  Geocoder.init(MapKeyApi); 
  Geolocation.getCurrentPosition(
                  (position) => {
                    setPinLat(position.coords.latitude)
                    setPinLog(position.coords.longitude)
                  setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0462,
                    longitudeDelta: 0.0261,
                  });
                  console.log('map regions:',region)
                  setMarker({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                      Geocoder.from(position.coords.latitude,
                         position.coords.longitude)
                          .then(json => {
                              console.log(json);
      var addressComponent = json.results[0].address_components;
                          })

                          .catch(error => console.warn(error));
                  },
                  (error) => {
                      // See error code charts below.
                  
                              setError(error.message)
                     
                          console.log(error.code, error.message);
                  },
                  {
                      enableHighAccuracy: false,
                      timeout: 10000,
                      maximumAge: 100000
                  }
              );
}
useEffect(() => {
  if (isfocussed) {
    GetcurrLocation()
}

  },[isfocussed]);


  return (
      <View style={[styles.container,{marginBottom:mapmargin, backgroundColor: theme === false? 'white':'  black'}]}>
        {region & marker >0?null:
        <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
        // initialRegion={{latitude:33.2,longitude:73.21,latitudeDelta:5,longitudeDelta:3}}
        region={region}>

              <MapView.Marker
              coordinate={marker}
                title={'title'}
                description={'here'}
              />
      
        
      </MapView>
        }

        <View style={{marginLeft:wp(3),marginTop:hp(2),marginBottom:hp(1)}}>
        <Ionicons name={'chevron-back'} size={30} 
          color= {Colors.Appthemeorangecolor}
          onPress={() => navigation.goBack()}/>

        </View>
        <View style={{alignItems:'center'}}>
{/* <OrdersCards
navplace={'trip'}
                                       pickupLoc={'pickup'}
                                       dropoffLoc={'dropoff'}
                                   /> */}
    <GooglePlacesAutocomplete
           //ref={ref}
      placeholder='Search'
      styles={{
        textInputContainer: styles.locationInput,
        textInput: styles.inputTextStyles,
        listView: styles.listView,
        description:styles.desc,
        predefinedPlacesDescription: {
          color: 'yellow'
      }
    }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        console.log(data, details.description);
        Geocoder.init(MapKeyApi); 
        Geocoder.from(details.description)
        .then(json => {
          var location = json.results[0].geometry.location;
          console.log(location.lat, location.lng);
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0462,
            longitudeDelta: 0.0261,
          });
          global.lat=location.latitude
          passLat(location)
          setMarker({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0462,
            longitudeDelta: 0.0261,
          });
        })
        .catch(error => console.warn(error));
      }}
      query={{
        key: MapKeyApi,
        language: 'en',
      }}
    />
    </View>
      <View
style={styles.lastView}
      > 
              <CustomButtonhere
                title={'ADD'}
                widthset={'78%'}
                topDistance={0}
      
                onPress={
                  () => AcountValidation()
                  // navigation.navigate('Drawerroute')
                }
              />
      </View>
      <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.ExclaimCircle}
                text={'You can only cancel trip within 60 minutes'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible(false),setModalVisible1(true)}}
                /> 
                     <ReasonModal 
                modalVisible={modalVisible1}
                CloseModal={() => setModalVisible1(false)}
                Icon={appImages.ExclaimCircle}
                text={'You can only cancel trip within 60 minutes'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'SUBMIT'}
 onPress={()=> {setModalVisible1(false),setModalVisible2(true)}}
                /> 
                      <CustomModal 
                modalVisible={modalVisible2}
                CloseModal={() => setModalVisibl2e(false)}
                Icon={appImages.CheckCircle}
                text={'Reason Submitted'}
                leftbuttontext={'CANCLE'}
                rightbuttontext={'OK'}
 onPress={()=> {setModalVisible2(false)}}
                /> 
      </View>


  );
};
 
export default PickupLocation;

