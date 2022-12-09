import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

//////////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import NotificationView from '../../../components/NotificationView/NotificationView';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setNavPlace} from '../../../redux/actions';

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

/////////////////app images///////////
import {appImages} from '../../../constant/images';

const Notification = ({navigation}) => {
  ///////////////////redux states///////////////////////
  const {hoteltype} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  /////////////Get Notification/////////////
  const [Notifications, setNotifications] = useState('');

  const GetNotifications = async () => {
    var user = await AsyncStorage.getItem('Userid');
    console.log('order request function', user);
    axios({
      method: 'GET',
      url: BASE_URL + 'api/notification/getToNotifications/' + user,
    })
      .then(async function (response) {
        console.log('list data here ', response.data);
        setNotifications(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetNotifications();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StatusBar backgroundColor={'black'} barStyle="light-content" />
        <CustomHeader
          headerlabel={'Notifications'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />
        {/* <NotificationView
       label={'Update Profile'}
       labelPress={()=>navigation.navigate('UpdateProfile')}
       /> */}
        {Notifications === ''
          ? null
          : Notifications.map((item, key) => (
              //    <TouchableOpacity onPress={()=>navigation.navigate('OrderDetail',{orderid:item._id,navplace:'Schedule'})}>
              //   </TouchableOpacity>
              <NotificationView
                notitext={item.detail}
                notitime={item.created_at}
                notiicon={
                  item.type === 'completed'
                    ? appImages.NotiCheck
                    : item.type === 'cancel'
                    ? appImages.NotiCancel 
                    : item.type === 'schedule'
                    ? appImages.NotiSchedule
                    : appImages.NotiOther
                }
              />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
