import * as React from 'react';
import { View, Text, ActivityIndicator,Image,TouchableOpacity } from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';

    ////////////app icons////////////
    import Icon from 'react-native-vector-icons/Ionicons';

    //////////////app pakages/////////////
import {
    Avatar,
} from 'react-native-paper';
import DashedLine from 'react-native-dashed-line';

import { BASE_URL } from '../../utills/ApiRootUrl';

import { appImages } from '../../../constant/images';
const TransactionCard = (props) => {
    return (
        <View style={styles.card}>
                      <View style={styles.uppercard}>
                        {props.cardtype==='invoice'?
                             <View style={{marginTop:hp(0),alignItems:'center',
       
               width:wp(100),
               //backgroundColor:Colors.Appthemeorangecolor
               }}>
           <View style={{flexDirection:"row",marginTop:hp(0),alignItems:'center',
               width:wp(50)}}>
            <Text style={[styles.Triptext,{fontSize:hp(2.3)}]}> 
                   Invoice # 
                       </Text>
                       <Text style={[styles.Timetext,{fontSize:hp(2)}]}> 
                   {  props.invoiceno}
                       </Text>
                 </View>
               </View>
                :
                    <View style={{flexDirection:"row",marginTop:hp(0),alignItems:'center',
                    justifyContent:'space-between',
                width:wp(85),
                //backgroundColor:Colors.Appthemeorangecolor
                }}>
            <View style={{flexDirection:"row",marginTop:hp(0),alignItems:'center',
                width:wp(50)}}>
             <Text style={[styles.Triptext,{fontSize:hp(2.3)}]}> 
                   {' Order # '} 
                        </Text>
                        <Text style={[styles.Timetext,{fontSize:hp(2)}]}> 
                    { props.cardtype==='invoice'? props.invoiceno: props.orderno}
                        </Text>
                  </View>
                  <View onPress={props.onpress}
                            style={{height:hp(5),width:wp(23),backgroundColor:Colors.Appthemecolor,
                            borderRadius:wp(2),alignItems:'center',justifyContent:'center'
                            }}
                            >
                            <Text style={styles.btntext}>{props.invoivcestatus}
                                </Text>
                            </View>
                </View>
                    }
  
                      </View>
 
        
          <View style={styles.innercard}>
 
                <View style={{
           justifyContent:'center',marginBottom:hp(1.5),

                                }}>
     
                                <View style={styles.textView}>
         <Text style={styles.Triptext}> 
        {props.cardtype==='invoice'? 'Invoice Status : ':'Time/Date : '}
                </Text>
                <Text style={styles.Timetext}> 
                {props.cardtype==='invoice'? props.invoicestatus : props.datetime}
                </Text>
                                </View>
                                <View style={styles.textView}>
         <Text style={styles.Triptext}> 
         {props.cardtype==='invoice'? 'Invoice Amount : ':'Amount : '}
                </Text>
                <Text style={styles.Timetext}>
          {props.cardtype==='invoice'? props.invoiceamount:props.amount}
                </Text>
                                </View>
                                <View style={styles.textView}>
         <Text style={styles.Triptext}> 
         {props.cardtype==='invoice'? 'Invoice Orders : ' : 'Driver : '}
                </Text>
                <Text style={styles.Timetext}> 
                {props.cardtype==='invoice'? props.invoiceorders : props.drivername}
                </Text>
                                </View>
                                {props.cardtype==='invoice'? null:
                                <View style={styles.textView}>
         <Text style={styles.Triptext}> 
         Dispatcher :
                </Text>
                <Text style={styles.Timetext}> 
             {props.dispatchername}
                </Text>
                                </View>
}
                                </View>

                 
      
            </View>
        </View>
       



    )
};

export default TransactionCard;