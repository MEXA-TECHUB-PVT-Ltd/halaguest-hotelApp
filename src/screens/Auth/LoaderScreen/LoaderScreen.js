import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

///////////////app components//////////
import Loader from '../../../components/Loader/Loader';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////////app images////////
import {appImages} from '../constant/images';

////////////////app store data//////////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoaderScreen = ({navigation}) => {
  ////////////////loading/////////////
  const [loading, setloading] = useState(true);
  // setTimeout(() => {
  //  navigation.replace('Onboarding'); // Stack Name
  // }, 3000);
  const getData = async () => {
    // AsyncStorage.removeItem('Userid');
    // AsyncStorage.removeItem('Username');
    // AsyncStorage.removeItem('UserEmail');
    try {
      await AsyncStorage.getItem('Userid')
        .then(db => {
          console.log('usertype', {db});
          if (db === null) {
            navigation.navigate('Login');
          }
          else{
            setloading(false)
            navigation.navigate('BottomTab');
          }
          // else{
          //     setTimeout(() => {
          //         navigation.replace('Login'); // Stack Name
          //       }, 1000);
          // }
        })
        .done();
    } catch (error) {}
  };
  const checkStatus = async () => {
    // var notification = JSON.parse(await AsyncStorage.getItem('OngoingStatus'));
    // console.log('notification', notification.orderNo);
    try {
      // JSON.parse(await AsyncStorage.getItem('OngoingStatus'))
      //     .then(db => {
      var data = JSON.parse(await AsyncStorage.getItem('OngoingStatus'));
      console.log('notification', data);
      // console.log('asnc data here in object',db)
      // console.log('asnc data here in object status', db.status)
      if (data != null && data.status === 'ongoing') {
        navigation.navigate('TripRoute', {
          orderid: data._id,
          driverLng: data.driver_Long,
          driverLat: data.driver_Lat,
          pickupLat: data.pickup_lat,
          pickupLng: data.pickup_log,
          dropoffLat: data.dropoff_lat,
          dropoffLng: data.dropoff_log,
        });
      } else {
        getData();
        // setTimeout(() => {
        //     navigation.replace('Drawerroute'); // Stack Name
        //   }, 3000);
      }
      //   }
      //).done();
    } catch (error) {}
  };
  useEffect(() => {
    //getData();
    checkStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};
export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
