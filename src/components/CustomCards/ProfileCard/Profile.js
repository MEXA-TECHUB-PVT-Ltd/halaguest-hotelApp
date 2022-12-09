import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';

    ////////////app icons////////////
    import Icon from 'react-native-vector-icons/Ionicons';

    //////////////////app images///////////////////
    import { appImages } from '../../../constant/images';

    //////////////app pakages/////////////
import {
    Avatar,
} from 'react-native-paper';

const ProfileCard = (props) => {
    return (
        <View style={styles.card}>

        <Avatar.Image
       // source={{uri:props.hotellogo}}
           source={appImages.ProfileUser}
            size={wp(25)}
            style={{backgroundColor:Colors.appgreycolor}}
        />
        {/* <View style={{
           // justifyContent: "center", alignContent: 'center',
          width:wp(60)
        }}> */}
            <Text style={styles.itemmaintext}>{props.hotelname}
            </Text>
            <Text style={styles.itemsubtext}>{props.hotelcity}
            </Text>
            <Text style={styles.itemsubtext}>{props.hotelemail}
            </Text>
      

        {/* </View> */}

</View>
    )
};

export default ProfileCard;