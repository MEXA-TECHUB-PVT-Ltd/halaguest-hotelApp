import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ImageBackground,
  BackHandler,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

////////////////////app pakages//////////////
import {Checkbox} from 'react-native-paper';

//////////////////app icons////////////////
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomTopTabs from '../../../components/TopTabs/CustomTopTabs';
import IconsTopTabs from '../../../components/TopTabs/IconsTabs/IconsTopTabs';
import DashboardHeader from '../../../components/Header/DashboardHeade';
import ViewAll from '../../../components/ViewAll/ViewAll';
import GuestCards from '../../../components/CustomCards/GuestCards/GuestCards';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';
import CustomCards from '../../../components/CustomCards/CustomCards';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setNavPlace,
  setTopTabDriver,
  setTopTabPayment,
  setTopTabVehicle,
} from '../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import TopTabstyles from '../../../styles/GlobalStyles/TopTabstyles';
import Inputstyles from '../../../styles/GlobalStyles/Inputstyles';

/////////////////app images///////////
import {appImages} from '../../../constant/images';

const Orders = ({navigation}) => {
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  ///////////////////redux states///////////////////////
  const {
    hoteltype,
    phone_no,
    top_tab_driver,
    top_tab_payment,
    top_tab_vehicle,
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  /////////////main menu status states/////////////
  const [Schedule, setSchedule] = useState(true);
  const [Complete, setComplete] = useState(false);

  /////////////main menu status states/////////////
  const [ScheduleOrders, setScheduleOrders] = useState('');
  const GetScheduleOrders = async () => {
    var user = await AsyncStorage.getItem('Userid');
    axios({
      method: 'GET',
      url: BASE_URL + 'api/Order/hotelOrdersScheduled/' + user,
    })
      .then(async function (response) {
        console.log('list data here ', response.data);
        setScheduleOrders(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  /////////////main menu status states/////////////
  const [CompleteOrders, setCompleteOrders] = useState('');
  const GetCompleteOrders = async () => {
    var user = await AsyncStorage.getItem('Userid');
    axios({
      method: 'GET',
      url: BASE_URL + 'api/Order/hotelOrdersCompleted/' + user,
    })
      .then(async function (response) {
        console.log('list data here ', response.data);
        setCompleteOrders(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetScheduleOrders();
    GetCompleteOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StatusBar backgroundColor={'black'} barStyle="light-content" />
        <CustomHeader headerlabel={'Orders'} />
        <View style={[TopTabstyles.TopTabView, {paddingHorizontal: wp(10)}]}>
          <TouchableOpacity
            onPress={() => {
              setSchedule(true), setComplete(false);
            }}>
            <IconsTopTabs
              title={'Schedule'}
              icon={appImages.Schedule}
              width={'25%'}
              state={Schedule}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSchedule(false), setComplete(true);
            }}>
            <IconsTopTabs
              title={'Completed'}
              icon={appImages.Completed}
              width={'25%'}
              state={Complete}
            />
          </TouchableOpacity>
        </View>
        {Schedule
          ? ScheduleOrders === ''
            ? null
            : ScheduleOrders.slice(0, 3).map((item, key) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OrderDetail', {
                      orderid: item._id,
                      navplace: 'Schedule',
                    })
                  }>
                  <OrdersCards
                    time={item.flight_time}
                    price={item.total_amount + '$'}
                    pickupLoc={item.pickup_location}
                    dropoffLoc={item.dropoff_location}
                  />
                </TouchableOpacity>
              ))
          : Complete
          ? CompleteOrders === ''
            ? null
            : CompleteOrders.slice(0, 3).map((item, key) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OrderDetail', {
                      orderid: item._id,
                      navplace: 'Completed',
                    })
                  }>
                  <OrdersCards
                    time={item.flight_time}
                    price={item.total_amount + '$'}
                    pickupLoc={item.pickup_location}
                    dropoffLoc={item.dropoff_location}
                  />
                </TouchableOpacity>
              ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
