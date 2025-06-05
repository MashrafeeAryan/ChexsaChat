import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { account } from "@/appwriteConfig";
import Toast from "react-native-toast-message";

export default function login() {
  const [passwordVisible, passwordVisibilityChange] = useState(false);
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const route = useRouter()
  const handleLogin = async () => {
    try {
      const session = await account.createEmailPasswordSession(userEmail, userPassword)
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'You are logged in'
      })
      route.replace('/')
    } catch(error){
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your password or email address'
      })
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="bg-[#A9D3F4] h-full flex-1">
        <View className="items-center justify-center flex pt-6">
          <Image
            source={require("../../assets/images/Logo.png")}
            className="w-[170] h-[170]"
          />
        </View>

        <View
          className="bg-[#EAF6FF] h-3/4 absolute bottom-0 left-0 right-0 mx-2 p-6"
          style={{ borderRadius: 55 }}
        >
          <View className="pt-4">
            <TextInput
              placeholder="Email"
              className="border rounded-lg w-full border-[#A9D3F4] px-3 h-[50]"
              onChangeText={setUserEmail}
           />
          </View>
          <View className="pt-5">
            <View className="flex-row items-center border rounded-lg border-[#A9D3F4] px-3 h-[50]">
              <TextInput
                secureTextEntry={!passwordVisible}
                placeholder="Password"
                className="flex-1"
                onChangeText={setUserPassword}
              />
              {passwordVisible ? (
                <TouchableOpacity
                  onPress={() => {
                    passwordVisibilityChange(false);
                  }}
                >
                  <Ionicons name="eye" size={20} color="gray" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    passwordVisibilityChange(true);
                  }}
                >
                  <Ionicons name="eye-off" size={20} color="gray" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="pt-5 items-center justify-center">
            <TouchableOpacity 
            className="w-full rounded-full bg-[#8CB8E2] h-[50px] items-center justify-center flex"
            onPress={handleLogin}>
              <Text className="text-white font-bold text-xl font-sans">
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View className="pt-5 items-center justify-center">
            <Text className="text-[#8CB8E2] font-bold text-lg">
              Forgot password?
            </Text>
          </View>
          <View className="pt-5 items-center justify-center">
            <Text className="font-bold ">OR</Text>
          </View>

          <View className="items-center justify-center pt-5 flex-row">
            <View className="w-1/2">
              <Image
                source={require("../../assets/images/GoogleIcon.png")}
                className="w-[80] h-[80]"
              />
            </View>
            <View>
              <Image
                source={require("../../assets/images/AppleLogo.png")}
                className="w-[70] h-[70]"
              />
            </View>
          </View>
          <View className="pt-5 items-center justify-center">
            <Text className="text-[#8CB8E2] text-sm">
              Don't have an account?{" "}
              <Link href="/(auth)/signUP" className="font-bold underline">
                Click Here!
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
