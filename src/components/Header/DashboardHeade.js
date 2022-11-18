import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';

/////////////////import api functions///////////
import { GetAcountDetail } from '../../api/GetAccountDetail';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

//////////////app images/////////
import { appImages } from '../../constant/images';

////////////////app fonts////////
import { fontFamily } from '../../constant/fonts';

////////////////app redux///////////
import { useSelector } from 'react-redux';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'

const DashboardHeader = ({ navigation, headerlabel}) => {
    ////////////////////redux/////////////////////
    const { user_account_detail } = useSelector(state => state.userReducer);

  ///////////////data states////////////////////
  const [name, setName] = React.useState();
  const [image, setImage] = React.useState();
    const GetAcountDetail=async() => {
      var user= await AsyncStorage.getItem('Userid')
      console.log("order request function",user)
  
      await axios({
        method: 'GET',
        url: BASE_URL+'api/hotel/specificHotel/'+user,
      })
      .then(function (response) {
        console.log("response", JSON.stringify(response.data))
        setImage(response.data[0].img)
        setName(response.data[0].hotel_name)

      })
      .catch(function (error) {
        console.log("error", error)
      })
      }
      useEffect(() => {
        GetAcountDetail()
      }, []);
  return (
      <View style={[style.headerView]} >
          <View style={style.labelView}>
          <Text style={style.labelmaintext}>Welcome</Text>
          <Text style={style.labelsubtext}>{name}</Text>
          </View>
          <Image
            //source={require('../../assets/dataimages/hotel.png')}
            source={{uri:BASE_URL+image}}
            style={style.logo}
            resizeMode='contain'
          />

            </View>

  );

};
const style = StyleSheet.create({
    headerView: {
        width:wp(100),
        height:hp(15),
      alignItems: 'center',
     flexDirection:'row',
     justifyContent:'space-between',
     paddingHorizontal:wp(7),
     borderBottomLeftRadius:wp(3),
     borderBottomRightRadius:wp(3),
     shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 19,
     backgroundColor:Colors.Appthemecolor
    },
  
    labelView: {
      width: wp(60),
      justifyContent: 'center',

    },
    logo:
    {
        height:wp(16),
        width:wp(16),
        borderRadius:wp(10)
      },
      labelmaintext:
{ 
    color: 'white',
     fontSize: hp(2.2), 
     fontWeight: 'bold', 
     fontFamily:fontFamily.Poppins_Bold,
     marginBottom:wp(2)
    },
    labelsubtext:
    { 
        color: 'white',
         fontSize: hp(1.8), 
         fontWeight: '100', 
         fontFamily:fontFamily.Poppins_Light,
        }
  });
export default DashboardHeader;