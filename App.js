import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation,createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//////////////notification/////////////////
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

//Screens
import AuthNav from './src/navigation/AuthNav/AuthNav';
import BottomTab from './src/navigation/BottomTab/BottomTab';
import OrderDetail from './src/screens/StackScreens/OrderDetail/OrderDetail';
import GuestsList from './src/screens/StackScreens/Guests/GuestsList';
import GuestsDetail from './src/screens/StackScreens/Guests/GuestsDetail';
import AddGuests from './src/screens/StackScreens/Guests/AddGuests';
import EditGuests from './src/screens/StackScreens/Guests/EditGuests';
import Settings from './src/screens/StackScreens/Settings/Settings';
import UpdateProfile from './src/screens/StackScreens/UpdateProfile/UpdateProfile';
import PrivacyTerms from './src/screens/StackScreens/Conditions/PrivacyTerms';
import CreateTrip from './src/screens/StackScreens/Trip/CreateTrip/CreateTrip';
import TripRoute from './src/screens/StackScreens/Trip/TripRoute/TripRoute';
import TripCompleted from './src/screens/StackScreens/Trip/TripRoute/TripCompleted';
import Rattings from './src/screens/StackScreens/Rattings/Rattings';
import FindingDriver from './src/screens/StackScreens/Trip/TripRoute/FindingDriver';
import Location from './src/screens/StackScreens/Trip/Location/Location';
import TrackLocation from './src/screens/StackScreens/Trip/Location/TrackLocation';
import Notification from './src/screens/StackScreens/Notification/Notification';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef()
function App(props) {
  const [loading, setLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState('AuthNav');
  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log("notification here", JSON.stringify(remoteMessage.data.type))
    //setInitialRoute(remoteMessage.data.type)
    navigationRef.navigate(remoteMessage.data.type);
      //navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log("notification here",remoteMessage.data.type)
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GuestsList"
            component={GuestsList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GuestsDetail"
            component={GuestsDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddGuests"
            component={AddGuests}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditGuests"
            component={EditGuests}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PrivacyTerms"
            component={PrivacyTerms}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateTrip"
            component={CreateTrip}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TripRoute"
            component={TripRoute}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TripCompleted"
            component={TripCompleted}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Rattings"
            component={Rattings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FindingDriver"
            component={FindingDriver}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Location"
            component={Location}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TrackLocation"
            component={TrackLocation}
            options={{
              headerShown: false,
            }}
          />
              <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
