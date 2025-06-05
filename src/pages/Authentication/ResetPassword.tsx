import React from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import AuthenticationStyles from "./AuthenticationStyles";
import Header from "../../components/Header";
import { Button1, Button2 } from "../../components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
      <SafeAreaView style={AuthenticationStyles.main}>
        <Header />
        <Text style={AuthenticationStyles.heading}>Reset Password</Text>
        <TextInput
          placeholder="New Password"
          style={AuthenticationStyles.input}
          placeholderTextColor="#6E6E7A"
        />
        <TextInput
          placeholder="Confirm Password"
          style={AuthenticationStyles.input}
          placeholderTextColor="#6E6E7A"
        />
        <Button1 text="Confirm" />
        
      </SafeAreaView>
    );
}

export default ResetPassword