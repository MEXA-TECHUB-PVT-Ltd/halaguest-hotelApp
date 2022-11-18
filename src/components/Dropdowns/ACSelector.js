import React, { useEffect, useState,useRef } from 'react';
import {View,Text,TouchableOpacity,Image,FlatList} from 'react-native';

///////////////////app pakages///////////////
import RBSheet from "react-native-raw-bottom-sheet";

////////////app styles//////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import {setCarAC} from '../../redux/actions';

const ACType = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'yes',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'no',
    },

  ];

const CarACSelector = (props) => {
    console.log('here:',props)
    /////////////redux states///////
    const { condition} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    return(
        <RBSheet
        //sstyle={{flex:1}}
        ref={props.refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        openDuration={50}
        closeDuration={50}
        animationType="fade"
        
        //height={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: "white"
          },
          container: {
            borderTopLeftRadius:wp(10),
            borderTopRightRadius:wp(10),
             // height:hp(95)
             maxHeight:hp(90),
          }
        }}>
    
        <View style={{
          flexDirection: 'row', justifyContent: "space-between",
          marginHorizontal: 0
        }}>
          <Text style={styles.bottomsheettext}>Select Car AC</Text>
        </View>
        <FlatList
          data={ACType}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
            onPress={() =>
              {
                dispatch(setCarAC(item.title)),
                props.refRBSheet.current.close()
              }}
             >
            <View style={styles.card}>
                <Text style={styles.cardtext}>
                  {item.title}
                </Text>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        
        />

        </RBSheet>
    )
};

export default CarACSelector;