import React, { useState } from 'react'
import { Text, View ,StyleSheet, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SosButtons =()=> {
  const navigation = useNavigation();     
  const [bg, setbg]=useState()
    return (
        <View className='w-full flex-row flex-wrap flex-1 justify-center items-center pt-5 px-3' >

          <TouchableOpacity className='w-1/2 h-28 flex justify-center items-center rounded-lg drop-shadow-2xl' style={{ backgroundColor: bg === 1 ? '#f67f7f69' : 'transparent' }}  onPress={()=>{
            setbg(1),
            navigation.navigate('Timer',{alert:'Police'})
          }}>
          <Image
          source={require('../assets/img/police.png')}
          className='w-14 h-14'
          />
          <Text className='text-sm font-semibold m-2'>Police</Text>
          </TouchableOpacity>

          <TouchableOpacity className='w-1/2 h-28 flex justify-center items-center rounded-lg' style={{ backgroundColor: bg === 2 ? '#f67f7f69' : 'transparent' }}  onPress={()=>{navigation.navigate('Timer',{alert:'Women Helpline'}),setbg(2)}}>
          <Image
          source={require('../assets/img/helpline.png')}
          className='w-14 h-14'
          />
          <Text className='text-sm font-semibold m-2'>Women Helpline</Text>
          </TouchableOpacity>

          <TouchableOpacity className='w-1/2 h-28 flex justify-center items-center rounded-lg' style={{ backgroundColor: bg === 3 ? '#f67f7f69' : 'transparent' }}  onPress={()=>{navigation.navigate('Timer',{alert:'Ambulance'}),setbg(3)}} >
          <Image
          source={require('../assets/img/ambulance.png')}
          className='w-14 h-14'
          />
          <Text className='text-sm font-semibold m-2'>Ambulance</Text>
          </TouchableOpacity>

          <TouchableOpacity className='w-1/2 shadow-black h-28 flex justify-center items-center rounded-lg' style={{ backgroundColor: bg === 4 ? '#f67f7f69' : 'transparent' }}  onPress={()=>{navigation.navigate('Timer',{alert:'Home'}),setbg(4)}}>
          <Image
          source={require('../assets/img/house.png')}
          className='w-14 h-14'
          />
          <Text className='text-sm font-semibold m-2'>Home</Text>
          </TouchableOpacity>
  
        </View>
    )
}
export default SosButtons;
