import Button from "@/components/ui/button";
import {
  CheckboxInput,
  DefaultInput,
  PasswordInput,
} from "@/components/ui/inputs";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="w-full p-4">
        <Text className="text-h-4 text-center mb-m">Welcome</Text>
        <View className="mt-4 w-full">
          <DefaultInput
            placeholder="Enter your email"
            leftIcon={
              <Ionicons name="mail-outline" size={20} color="#a4a4a4" />
            }
            className="mb-6"
          />
          <PasswordInput placeholder="Enter your password" />
        </View>
        <View className="my-6 flex-row justify-between items-center">
          <CheckboxInput
            label="Remember me"
            onCheckedChange={(checked) => console.log("Remember me:", checked)}
          />
          <Pressable>
            <Text className="text-b-1 font-semibold text-primary-500">
              Forgot your password?
            </Text>
          </Pressable>
        </View>
        <Button size="lg">Login</Button>
        <View className="flex-row gap-s my-8 w-full justify-center items-center">
          <View className="h-px flex-1 bg-primary-600" />
          <Text className="text-b-1 font-semibold text-primary">Or</Text>
          <View className="h-px flex-1 bg-primary-600" />
        </View>
        <Button
          variant="outline"
          size="lg"
          imageIcon={require("../../assets/images/google.png")}
        >
          Google
        </Button>

        <View className="mt-8 flex-row justify-center items-center">
          <Text className="text-b-1 text-primary">
            Don&apos;t have an account?{" "}
          </Text>
          <Pressable>
            <Text className="text-b-1 font-semibold text-primary">
              Create an account
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
