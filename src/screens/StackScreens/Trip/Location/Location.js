import React,{useState,useEffect,useRef} from 'react';
// Import required components
import {SafeAreaView, 
     View,Text,TouchableOpacity,ActivityIndicator
} from 'react-native';

//////////////////app components////////////////
import CustomButtonhere from '../../../../components/Button/CustomButton';

//////////////app pakages////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapKeyApi } from '../../../../utills/MapKey';

//////////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
 
////////////////app redux///////////
import { useSelector, useDispatch } from 'react-redux';
import { 
  setPickupLocationLat,setPickupLocationLng,setPickupLocationAddress,
setDropoffLocationLat,setDropoffLocationLng,setDropoffLocationAddress
} from '../../../../redux/actions';

////////////////////app images/////////////////
import { appImages } from '../../../../constant/images';


const Location = ({navigation,route}) => {
console.log('here from previous data:',route.params)

////////////////previous data//////////
const[predata]=useState(route.params)

  ////////////////////redux/////////////////////
  const { pickup_location_lat} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();  

    ////////////isfocused//////////
    const isfocussed = useIsFocused()

  /////////////map states////////////
    const [eror, setError]=useState()
const [region, setRegion] = useState();
const [marker, setMarker] = useState('');
const [pinlat, setPinLat] = useState(0);
const [pinlog, setPinLog] = useState(0);

/////////////user current location////////////////
const GetcurrLocation=()=>{
  Geocoder.init(MapKeyApi); 
  Geolocation.getCurrentPosition(
                  (position) => {
                    console.log('curr coords:',position.coords)
                    setPinLat(position.coords.latitude)
                    setPinLog(position.coords.longitude)
                    console.log('coords:',pinlat,pinlog)
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
                              //console.log(json);
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
      <View style={[styles.container]}>
        {pinlat===0 && pinlog===0?
        <View></View>
        :
        <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
       initialRegion={{latitude:33.2,longitude:73.21,latitudeDelta:5,longitudeDelta:3}}
        //region={region}
        >

              {/* <MapView.Marker
              coordinate={marker}
                title={'title'}
                description={'here'}
              />
       */}
        
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
        {
          predata.navplace === 'DropoffLocation'?
          dispatch(setDropoffLocationAddress(details.description))
      :
      dispatch(setPickupLocationAddress(details.description))
    }
    
        Geocoder.init(MapKeyApi); 
        Geocoder.from(details.description)
        .then(json => {
          var location = json.results[0].geometry.location;
          console.log(location.lat, location.lng);
          {
            predata.navplace === 'DropoffLocation'?
            dispatch(setDropoffLocationLat(location.lat))
        :
        dispatch(setPickupLocationLat(location.lat))
      }
      {
        predata.navplace === 'DropoffLocation'?
        dispatch(setDropoffLocationLng(location.lat))
    :
    dispatch(setPickupLocationLng(location.lat))
  }
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0462,
            longitudeDelta: 0.0261,
          });
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
                title={   predata.navplace === 'DropoffLocation'?'DROPOFF LOCATION':'PICKUP LOCATION'}
                widthset={'78%'}
                topDistance={0}
      
                onPress={
                  () => 
                   navigation.goBack()
                }
              />
      </View>

      </View>


  );
};
 
export default Location;

