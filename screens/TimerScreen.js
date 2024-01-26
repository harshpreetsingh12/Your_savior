import React, { useEffect,useState } from 'react'
import { Text, View ,StyleSheet,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
// import {Constants,SMS} from 'expo';
import * as SMS from 'expo-sms';
// import { auth } from '../firebase';
// import sanityClient from '../Sanity';

// import SendSMS from 'react-native-sms'

// import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
// import SmsAndroid from 'react-native-get-sms-android';

const Timer =()=> {
  const {params:{
    alert,emer,longitude,latitude
  },} = useRoute();
  const [counter, setCounter] = useState(10);
  const [number, setNumber] = useState([]);

  // console.log(emergency[0],emergency[1])
  async function generateSos(){
    const emergency = emer.split(",");
    if (emergency.length==1){
      const { result } = await SMS.sendSMSAsync(
        [`${emergency[0]}`],
        `Hey I need Help 
        https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
        );
      }
    if (emergency.length==2){
      const { result } = await SMS.sendSMSAsync(
        [`${emergency[0]}`,`${emergency[1]}`],
        // ['7500214921','8630228697'],
        `SOS Hey I need Help https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
        );
      }
    // console.log(result)
  }
  
  useEffect(()=>{
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter == 0) {
      if (alert=='SOS'){
        generateSos()
        // getSMSPermission()
        // sendSMS()
      }
      else{console.log('jo')}
    //   SendSMS.send({
    //     body: 'The default body of the SMS!',
    //     recipients: ['9149054816', '7500214921'],
    //     successTypes: ['sent', 'queued'],
    //     allowAndroidSendWithoutReadPermission: true,
    //     // attachment: attachment
    // },(completed, cancelled, error) => {
    //     console.log('SMS Callback: completed: ' + completed);
    //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    // }).then(console.log('hi'));

    // ###############################################
    //   var phoneNumbers = {
    //     "addressList": ["+919149054816", "+919027607131"]
    //   };
    // var phoneNumbers='+919149054816'
    // var message = "This is automated test message"
    // SmsAndroid.autoSend(
    //   // JSON.stringify(phoneNumbers),
    //   phoneNumbers,
    //   message,
    //     (fail) => {
    //         console.log('Failed with this error: ' + fail);
    //     },
    //     (success) => {
    //         console.log('SMS sent successfully'+success);
    //     },
    //   );
    navigation.navigate('Home')
  } 
},[counter])
  const navigation = useNavigation();

    
    return (
      <View className='absolute z-50 w-full top-0 h-full bg-[#ff5e5e69] flex justify-center items-center'>
          {alert==='SOS'?(
        <Text className='text-black m-8 p-2 bg-gray-100 rounded-full'>
          Generating {alert} in {counter} seconds.
           </Text>
          ):(
            <Text className='text-black text-base m-4 p-2 bg-gray-100 rounded-full flex items-center justify-center'>
          Making Sms & Call to {alert} in
           </Text>
          )}
      <View className='mb-4 rounded-full h-44 w-44 bg-[#f67f7f69] flex justify-center items-center shadow-2xl'>
          <View className=' flex items-center shadow shadow-[#FF5757] justify-center rounded-full bg-[#FF5757] h-40 w-40 ' >
          <Text className='text-5xl text-white'>{counter}</Text>
          </View>
        </View>
          <TouchableOpacity onPress={navigation.goBack} className='m-8 p-2 bg-gray-100 rounded-full'>
            <Text className='text-black'>Cancel Alert</Text>
        </TouchableOpacity>
      </View>
    )
}
export default Timer;
