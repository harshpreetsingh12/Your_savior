import React, { useState ,useEffect} from 'react'
import { Text, View ,StyleSheet, Button, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {HomeIcon,ClipboardDocumentListIcon, PencilSquareIcon, UserIcon, MapIcon} from "react-native-heroicons/outline";
// import sanityClient from '../Sanity';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../firebase'

const NavBar =({routename})=> {
  // const [currentUser, setcurrentUser] = useState([]);
  // const getData= async ()=>{
    // const Uinfo = await sanityClient.fetch(`
    // *[_type == "Userinfo" && email =='${auth.currentUser?.email.toLowerCase()}']{
    //   ...,
    // }`)
  //   const Cuser = JSON.stringify(Uinfo)
  //   await AsyncStorage.setItem('CurrentUser', Cuser)
  //   setcurrentUser(JSON.parse(Cuser))
  // }
  const navigation = useNavigation();
  const color ='#FF5757'
  const [navcol, setNavcol]=useState("H")
  // console.log(props.navigation.state.routeName)
  // useEffect(()=>{
  //   getData()
  //   },[]);
  // console.log("navbar",currentUser)
    return (
      <View className='bg-gray-100 w-full h-14 fixed bottom-0 flex-row justify-center items-center'>
        {/* <Button title='go to home screen' onPress={()=>navigation.navigate('Chat')}/>
        <Button title='go to feed screen' onPress={()=>navigation.navigate('Chat')}/> */}
        <TouchableOpacity className={`m-0 h-full bg-gray flex justify-center items-center px-4 border-t-2 
        `} style={{ borderColor: navcol === 'H' ? '#FF5757' : 'transparent' }}  onPress={() => {navigation.navigate('Home',{color}), setNavcol('H')}}>
        {/* <Image
          source={require('../assets/img/home.png')}
          className='w-7 h-7'
          /> */}
          <HomeIcon style={{ color: navcol === 'H' ? '#FF5757' : 'black' }}  size={30} />
        </TouchableOpacity>
        <TouchableOpacity className='m-0 px-4  h-full bg-gray flex justify-center items-center border-t-2' style={{ borderColor: navcol === 'F' ? '#FF5757' : 'transparent' }}  onPress={() => {navigation.navigate('Feed'), setNavcol('F')}}>
        {/* <Image
          source={require('../assets/img/feed.png')}
          className='w-7 h-7'
          /> */}
           <ClipboardDocumentListIcon  style={{ color: navcol === 'F' ? '#FF5757' : 'black' }} size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate('map'),setNavcol('M')}} className='m-2 px-4 h-full bg-gray flex justify-center items-center border-t-2' style={{ borderColor: navcol === 'M' ? '#FF5757' : 'transparent' }}>
      
           <MapIcon style={{ color: navcol === 'M' ? '#FF5757' : 'black' }}  size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate('Article'),setNavcol('A')}} className='m-0 px-4 h-full bg-gray flex justify-center items-center border-t-2' style={{ borderColor: navcol === 'A' ? '#FF5757' : 'transparent' }}>
        {/* <Image
          source={require('../assets/img/article.png')}
          className='w-7 h-7 scale-125'
          /> */}
           <PencilSquareIcon style={{ color: navcol === 'A' ? '#FF5757' : 'black' }}  size={30} />
        </TouchableOpacity>
        <TouchableOpacity className='m-0 px-4 h-full bg-gray flex justify-center items-center border-t-2' style={{ borderColor: navcol === 'U' ? '#FF5757' : 'transparent' }} onPress={() => {navigation.navigate('user'), setNavcol("U")}}>
           <UserIcon  style={{ color: navcol === 'U' ? '#FF5757' : 'black' }}  size={30} />
        </TouchableOpacity>
        </View>
    )
}
export default NavBar;

const styles = StyleSheet.create({})