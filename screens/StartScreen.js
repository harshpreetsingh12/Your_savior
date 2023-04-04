import React,{useEffect,useState} from 'react'
import { Text, View ,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const StartScreen =()=> {
  const [loading, setloading]=useState(false)
    const navigation = useNavigation();
    // const [counter, setCounter] = useState(4);
    useEffect(()=>{
      // counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (loading==true) return navigation.navigate('Login')
      
    },[])

    console.log(loading)
    return (
      <>
      {!loading ?(
        <View className='absolute z-50 w-full top-0 h-full bg-[#FF5757] flex justify-center items-center'>
          <Image
          source={require('../assets/logosav.png')}
          className='w-full h-20 mt-3'
          />
          <TouchableOpacity className='absolute h-9 w-20 z-20 bottom-5 right-4 bg-white rounded flex justify-center items-center'><Text className='text-black' onPress={()=>{setloading(!loading),navigation.navigate('Login')}}>Next</Text></TouchableOpacity>
      </View>

):(
  <View></View>
  )}
  </>
    )
}
export default StartScreen;
