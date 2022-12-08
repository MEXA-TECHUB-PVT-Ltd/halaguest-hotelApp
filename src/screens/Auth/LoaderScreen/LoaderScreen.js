import React, { useState, useEffect } from "react";
import {
    StatusBar,
    SafeAreaView,
    ImageBackground,
    ActivityIndicator,
    StyleSheet
} from "react-native";

///////////////app components//////////
import Loader from "../../../components/Loader/Loader";

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  ////////////////////app images////////
import { appImages } from '../constant/images';

////////////////app store data//////////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoaderScreen = ({ navigation }) => {

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
                    console.log('usertype',{db})
                    if(db)
                    {
                            navigation.navigate('BottomTab');
                    }
                    // else{
                    //     setTimeout(() => {
                    //         navigation.replace('Login'); // Stack Name
                    //       }, 1000);
                    // }
                            }  
                ).done();
            } catch (error) {
            }
   
    }
    const checknotification = async () => {
  
     var notification= await AsyncStorage.getItem('Notification')
     console.log('notification',notification)
        try {
           await AsyncStorage.getItem('OngoingStatus')
                .then(db => {
                    console.log('usertype',db)
                    if(db)
                    {
                            navigation.navigate('UpdateProfile');
                    }
                    else{
                        getData()
                        // setTimeout(() => {
                        //     navigation.replace('Drawerroute'); // Stack Name
                        //   }, 3000);
                    }
                            }  
                ).done();
            } catch (error) {
            }
   
    }
    useEffect(() => {
        //getData();
        checknotification();
    }, []);


    return (

        <SafeAreaView style={styles.container}>
        <Loader
        isLoading={loading}
        />
    </SafeAreaView>

    );
};
export default LoaderScreen;

const styles = StyleSheet.create({
    container:
    {
      flex: 1,
  backgroundColor:'white'
    }
})