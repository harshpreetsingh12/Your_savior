import React from 'react'
import { Text, View ,StyleSheet,Image, ScrollView,TouchableOpacity,Linking} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {ArrowLeftIcon} from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native'
const AboutSavior =()=> {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
      <ScrollView>
        <View className='h-full bg-white flex items-center'>
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-10 left-5 z-10 p-2 bg-gray-300 rounded-full'>
        <ArrowLeftIcon color='#FF5757' size={24}/>
        </TouchableOpacity>
  
        <View className='flex items-center w-full z-0 mt-2'>
        <Image
          source={require('../assets/logosav.png')}
          className='w-80 h-20 mt-3'
          />
 </View>

          <View className='flex items-center'>
          <Text className='text-black text-xl p-2'>About Us</Text>
          <Text className='text-black text-base p-2 mx-1'>In India, crime and accidents are increasing every day, resulting in deaths, serious injuries, depression, etc. In today’s time, where there is an equality in everything between both the gender. There is an equality in crime rate also. Both gender faces equal amount of violence, physical assault, harassment, molestation against them. The problem is that they don’t get help when they needed the most at that instant of time so, as a result of the problem, our team SAVIOR came up with a solution to solve this problem and create a social innovation. As a solution to this problem, we intend to create a mobile application called “Your Savior” (you deserve safety). This app will benefit everyone in this society who needs help but doesn’t know where to turn when a crisis occurs.
          </Text></View>

          <View className='flex items-center'>
          <Text className='text-black text-xl p-2'>Usage Of Savior</Text>
          <Text className='text-black text-base p-2 mx-1'>Due to the increasing crime rate in India, our team Search developed an application called Your Saviors in an attempt to resolve this issue. Let us discuss the UI design for our application “YOUR SAVIORS”, our application will have 4 main screens and 2 main features named SOS screen and a feeds screen This is the home page of our app which has an eye catching SOS button hold which will generate calls and SMS to your savior’s. And down here we have emergency specific buttons pressing them will generate calls and SMS to that service. In our second screen, we will have reports or feeds related to crimes in India. In one section, users will be able to describe their experience and ask for justice, while in another section, news of crimes against men and women will be presented. Our third screen will display a map of all nearby emergency services as well as your location and the best route to reach them. Our app is unique in its own way. The purpose of our efforts is to raise awareness in society to raise voices against such crimes, especially crimes against women and children. Using social media and complaints, we aim to assist all victims who report to our app without disclosing their identity. It is important for all members of society to be informed about what is happening in society. It is our goal to make society realize the true situation of rape, robbery, and assault victims by having them visualize their own families at the victim's place.
          {'\n'} It will help you in many ways in many situations: {'\n'}(1) If you are in danger, the system shows your current location by SMS or call to your saviors.  {'\n'}(2) It will have a helpful feature called feeds that will let you write down and report your true story not only for yourself but also to help others by writing down their true stories as well.  {'\n'}(3) In those feeds, our team will identify the true stories and report them to the appropriate police station without revealing the victim's identity.
</Text>
          </View>
          <Text className='text-black text-xl p-2'>Savior's Team</Text>
          <View className='w-full mb-4 p-3'>
  <View className='py-4 flex-row justify-between'>
  <Text className='text-base'>Harshpreet Singh</Text>
  <Text className='text-base' style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://www.linkedin.com/in/harshpreet-singh-230513221/')}>
  Linkdin
</Text>
  </View>
  {/* <View className='py-4 flex-row justify-between'>
  <Text className='text-base'>Mahima Sharma</Text>
  <Text className='text-base' style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://www.linkedin.com/in/mahima-sharma-28b976228/')}>
  Linkdin
</Text>
  </View>
  <View className='py-4 flex-row justify-between'>
  <Text className='text-base'>Ankit Gupta</Text>
  <Text className='text-base' style={{color: 'blue'}}
      onPress={() => Linking.openURL('')}>
  Linkdin
</Text>
  </View> */}
</View>


</View>
      </ScrollView>
          </SafeAreaView>
    )
}
export default AboutSavior;