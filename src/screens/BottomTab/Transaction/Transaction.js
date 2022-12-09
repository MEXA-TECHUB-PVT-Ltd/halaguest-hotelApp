import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, StatusBar,
    ScrollView,
    TouchableOpacity, ActivityIndicator
} from 'react-native';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import TransactionCard from '../../../components/CustomCards/TransactionCard/TransactionCard';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { setNavPlace} from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';

/////////////////app images///////////
import { appImages } from '../../../constant/images'

const Transaction = ({ navigation }) => {

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();


            /////////////main menu status states/////////////
    const [Transaction, setTransaction] = useState('')
        const GetTransaction = async () => {
            var user = await AsyncStorage.getItem('Userid');
            axios({
                method: 'POST',
                url: BASE_URL + 'api/invoiceAdmin/getAllInvoiceByHotelId',
                data:{
                    hotel_id:user
                }
            })
                .then(async function (response) {
                    console.log("list data here ", response.data)
                    setTransaction(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
            

    useEffect(() => {
        GetTransaction()
      
    }, []);

    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
          headerlabel={'Transaction History'}
          headerplace={'transaction'}
          onpressimage={()=> navigation.navigate('UninvoiceOrders')}
        />

{Transaction===""?null:
Transaction.map((item, key) => (
    <TouchableOpacity
    activeOpacity={0.9}
    onPress={()=>navigation.navigate('TransactionOrders',{invoiceid:item._id,navplace:'Transaction'})}>
<TransactionCard 
                                      invoiceno={item.InvoiceNo}
                                       invoicestatus={item.status}
                                       invoiceamount={item.totalAmount}
                                       invoiceorders={item.order_id.length}
                                    cardtype={'invoice'}
                                   />
                                   </TouchableOpacity>
))
}

      
   
</ScrollView>
</SafeAreaView>

    )
};

export default Transaction;