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
import { appImages } from '../../../constant/images';

const UninvoiceOrders = ({ navigation,route }) => {

    //////////////previous data///////
    const[predata]=useState(route.params)
    //Modal States
    const [modalVisible, setModalVisible] = useState(false);

    ///////////////////redux states///////////////////////
    const {hoteltype, phone_no,top_tab_driver,top_tab_payment,top_tab_vehicle } =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();


            /////////////main menu status states/////////////
    const [Uninvoice, setUninvoice] = useState('')
        const GetUninvoice = async () => {
            var user = await AsyncStorage.getItem('Userid');
            axios({
                method: 'POST',
                url: BASE_URL + 'api/Order/getOrderWithoutInvoicing',
                data:{
                    invoicing:'false',
                }
            })
                .then(async function (response) {
                    console.log("list data here ", response.data)
                    setUninvoice(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
            

    useEffect(() => {
        GetUninvoice()
      
    }, []);

    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <CustomHeader
          headerlabel={'Transaction History'}

        />

{Uninvoice===""?null:
Uninvoice.map((item, key) => (
    // <TouchableOpacity
    // activeOpacity={0.9}
    // onPress={()=>navigation.navigate('InvoiceList',{orderid:item._id,navplace:'Schedule'})}>
<TransactionCard
                                     invoivcestatus={item.invoiceStatus}
                                      orderno={item.orderNo}
                                      amount={item.total_amount}
                                      datetime={item.flight_date+'/'+item.flight_time}
                                      drivername={item.driver_id.name}
                                      dispatchername={item.driver_id.dispacher_id[0].name_of_company}
                                   />
                                //    </TouchableOpacity>
))
}

      
   
</ScrollView>
</SafeAreaView>

    )
};

export default UninvoiceOrders;