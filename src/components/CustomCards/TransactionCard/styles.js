import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';

/////////////////app colors/////////////
import Colors from '../../../utills/Colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////////app fonts///////////////////
import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
card:
{
    margin:hp(1),
  borderRadius:wp(4),
//justifyContent:'center',
alignSelf:"center",
 width: wp(93),
  backgroundColor:'white',

  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6,
},
itemmaintext:
{
  color: Colors.BottomTabcolor,
  fontSize: hp(1.6),
  fontFamily:fontFamily.Poppins_Regular,
  marginLeft:wp(2)
},
itemsubtext:
{
  color: '#303030',
  fontSize: hp(1.8),
  fontFamily:fontFamily.Poppins_SemiBold
},

Triptext:
  {
    fontFamily:fontFamily.Poppins_SemiBold,
    fontSize:hp(1.8),
    color: Colors.Appthemecolor,
  },
  Timetext:
  {
    fontFamily:fontFamily.Poppins_Medium,
    fontSize:hp(1.8),
    color: '#303030',
    // /marginLeft:wp(2),
    textAlign:'right'
  },
  pricetext:
  {
    fontFamily:fontFamily.Poppins_SemiBold,
    fontSize:hp(1.5),
    color: '#303030',
  },

    btntext:
{
  color: 'white',
  fontSize: hp(1.6),
  fontFamily:fontFamily.Poppins_Regular,

},
textView:
{
    //marginBottom:hp(1),
     flexDirection:'row',
     alignItems:'center',
    justifyContent:'space-between'},
    innercard:
    {

        paddingHorizontal:wp(5),
        paddingVertical:hp(2),
    },
    uppercard:
    {
    backgroundColor:Colors.Appthemeorangecolor,
    borderTopRightRadius:wp(4),
    borderTopLeftRadius:wp(4),
    paddingHorizontal:wp(5),
    paddingVertical:hp(2),
    }
  });


  export default styles;
  