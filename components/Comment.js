import React from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import {GlobeAltIcon} from 'react-native-heroicons/outline'
const Comment =({
    id,username,comment,datee
  })=> {
    return (
        <View className='w-full py-2'>
          <View className='flex flex-row justify-between'>
          <Text className='font-semibold text-base'>{username}</Text> 
          <View className='flex flex-row space-x-1 items-center'>
            <GlobeAltIcon size={15} color={"black"}/>
          <Text>
            {datee}
            </Text>
            </View>
          </View>
        <Text className='text-base'>{comment}</Text>
        {/* <Text className='text-sm'>{datee}</Text> */}
        </View>
    )
}
export default Comment;
