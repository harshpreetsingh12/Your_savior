import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import useAuth from './hooks/useAuth';
import FeedScreen from './screens/FeedScreen';
import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'
import ArticleScreen from './screens/ArticleScreen'
import FullArticleScreen from './screens/FullArticleScreen'
import UserSetting from './screens/UserSetting'
import LoginScreen from './screens/LoginScreen';
import PostScreen from './screens/PostScreen';
import TimerScreen from './screens/TimerScreen';
import NavBar from './components/NavBar';
import StartScreen from './screens/StartScreen';
import AboutSavior from './screens/AboutSavior';
import NewPost from './screens/NewPost';
import ChatScreen from './screens/ChatScreen';
import UserInfoUpdate from './screens/UserInfoUpdate';
import AnimationScreen from './screens/AnimationScreen';
const Stack = createNativeStackNavigator();
const StackNavigator =()=> {
      

  const {user} = useAuth();
// console.log('stack',user)
    return (
      <>
     <Stack.Navigator>
     {/* <Stack.Screen name='Start' component={StartScreen}
         options={{headerShown:false,}}/> */}
        {user!='undefined' ?(
        <>
            {/* <Stack.Screen name='Animation' component={AnimationScreen} 
            options={{
            headerShown:false,
            }}/> */}
            <Stack.Screen name='Home' component={HomeScreen} 
            options={{
            headerShown:false,
            }}/>
            <Stack.Screen name='Feed' component={FeedScreen}
                  options={{
                    headerShown:false,
                    }}/>
            <Stack.Screen name='map' component={MapScreen}
                  options={{
                    headerShown:false,
                    }}/>
            <Stack.Screen name='Article' component={ArticleScreen}
                  options={{
                    headerShown:false,
                    }}/>
            <Stack.Screen name='FullArticle' component={FullArticleScreen}
                  options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
                    }}/>
            <Stack.Screen name='user' component={UserSetting}
                  options={{
                    headerShown:false,
                    }}/>
            <Stack.Screen name="Post" component={PostScreen}
                  options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
        }}/> 
            <Stack.Screen name="Timer" component={TimerScreen}
                  options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
        }}/>
            <Stack.Screen name="About" component={AboutSavior}
                  options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
        }}/>
            <Stack.Screen name="Newpost" component={NewPost}
                  options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
        }}/>
            <Stack.Screen name="Chat" component={ChatScreen}
                  options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
        }}/>
            <Stack.Screen name="update" component={UserInfoUpdate}
                  options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
        }}/>
            </>
      ) :( 
        <>
       <Stack.Screen name='Login' component={LoginScreen}
       options={{
         headerShown:false,
        }}/>
        </>
        
         )}
       </Stack.Navigator>

        {/* {user != 'undefined' &&  <NavBar />} */}
        </>
    );
};
export default StackNavigator;