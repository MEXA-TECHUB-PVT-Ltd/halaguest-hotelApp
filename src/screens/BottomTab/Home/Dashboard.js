import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,StatusBar, 
    ScrollView,
   Text, TouchableOpacity, 
} from 'react-native';

//////////////////////app components///////////////
import DashboardHeader from '../../../components/Header/DashboardHeade';
import ViewAll from '../../../components/ViewAll/ViewAll';
import GuestCards from '../../../components/CustomCards/GuestCards/GuestCards';
import OrdersCards from '../../../components/CustomCards/OrderCards/Orders';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge } from '../../../redux/actions';

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


const Home = ({ navigation }) => {

    const { name, age } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    /////////////main menu status states/////////////
    const [Guests, setGuests] = useState('')

    const GetGuests = async () => {
        var user= await AsyncStorage.getItem('Userid')
        console.log("order request function",user)
        axios({
            method: 'GET',
            url: BASE_URL + 'api/guest/getAllHotelGuests/'+user,
        })
            .then(async function (response) {
                console.log("list data here ", response.data)
                setGuests(response.data)
            })
            .catch(function (error) {
                console.log("error", error)
            })
        }

            /////////////main menu status states/////////////
    const [Orders, setOrders] = useState('')
        const GetOrders = async () => {

            axios({
                method: 'GET',
                url: BASE_URL + 'api/Order/allOrders',
            })
                .then(async function (response) {
                    console.log("list data here ", response.data)
                    setOrders(response.data)
                })
                .catch(function (error) {
                    console.log("error", error)
                })
            }
    

    useEffect(() => {
        GetGuests()
        GetOrders()
      
    }, []);

    return (
<SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <DashboardHeader
                headerlabel={'Username'}
                iconPress={() => { navigation.toggleDrawer() }}
                icon={'menu'}
                onpresseacrh={() => onSearch()}
            />
                        <ViewAll
                headerlabel={'Guests'}
                onpress={() =>navigation.navigate('GuestsList')}
            />
{ Guests === ''?null:
Guests.slice(0, 3).map((item, key) => (
    <GuestCards
                                        guestlogo={item.img}
                                        guestname={item.name}
                                        guestemail={item.email}
                                        guestgender={item.gender}
                                    
                                        // guestname={'Guest name here'}
                                        // guestemail={'Email here'}
                                        // guestgender={'Gender Here'}
                                    />
))

}

<ViewAll
                headerlabel={'Orders'}
                onpress={() =>navigation.navigate('OrderDetail')}
            />
{Orders === ''?null:

Orders.slice(0, 3).map((item, key) => (
<OrdersCards
                                      
                                      time={item.flight_time}
                                       price={item.total_amount+'$'}
                                       pickupLoc={item.pickup_location}
                                       dropoffLoc={item.dropoff_location}
                                    //    time={'00:00 pm'}
                                    //    price={'200'+'$'}
                                    //    pickupLoc={'Pickup location here'}
                                    //    dropoffLoc={'Drop off location here'}
                                   />
))}


</ScrollView>
<TouchableOpacity style={styles.createtripbtn}
onPress={()=>navigation.navigate('CreateTrip')}
>
    <Text style={styles.createtriptext}>Create a Trip</Text>
</TouchableOpacity>
</SafeAreaView>

    )
};

export default Home;