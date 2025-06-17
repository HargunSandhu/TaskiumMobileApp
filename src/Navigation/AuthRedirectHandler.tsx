import React, {useEffect} from 'react';
import {Linking} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {supabase} from '../lib/supaBaseClient';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/types';

const AuthRedirectHandler = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const url = event.url;
      if (url.includes('login-callback')) {
        const {data, error} = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error.message);
          return;
        }

        if (data?.session) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          });
        } else {
         
          navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          });
        }
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });

    return () => subscription.remove();
  }, [navigation]);

  return null;
};

export default AuthRedirectHandler;
