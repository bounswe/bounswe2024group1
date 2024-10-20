import { zodResolver } from "@hookform/resolvers/zod";
import {
  Link,
  Redirect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  VStack,
} from "@/components/ui";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { fetchLogin } from "@/services/api/programmingForumComponents";
import {
  FetchError,
  setFormErrors,
} from "@/services/api/programmingForumFetcher";
import useAuthStore from "@/services/auth";
import { View } from "react-native";
import { z } from "zod";
const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  redirectTo: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const params = useLocalSearchParams<{ from?: string }>();
  const from = params.from || "";

  const auth = useAuthStore();

  const form = useForm<LoginFormData>({
    defaultValues: {
      redirectTo: from,
      password: "",
      usernameOrEmail: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting, errors },
  } = form;
  const nvg = useNavigation();

  const submit: SubmitHandler<LoginFormData> = async ({
    redirectTo,
    ...data
  }): Promise<void> => {
    try {
      const response = await fetchLogin({
        body: data,
      });
      if (response.data.token) {
        useAuthStore.getState().setToken(response.data.token);
        if (redirectTo) nvg.navigate(redirectTo as never);
      }
    } catch (e) {
      console.log(e);
      setFormErrors(e as FetchError, setError);
    }
  };

  return (
    <View className="flex flex-1 items-center justify-center">
      <Card className="mx-auto max-w-sm">
        {auth.token && <Redirect href={from as any} />}
        <View className="mb-6">
          <Text className="text-2xl">Login</Text>
          <Text>Enter your email below to login to your account</Text>
        </View>
        <VStack space="lg">
          <FormProvider {...form}>
            <View className="grid gap-2">
              <Controller
                control={control}
                name="usernameOrEmail"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>
                        Email or username
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="username@example.com"
                        autoComplete="email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                    <FormControlHelper>
                      <FormControlHelperText>
                        You can use your email or username to log in.
                      </FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                      <FormControlErrorText>
                        {error?.message}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                )}
              />
            </View>
            <View className="grid gap-2">
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="password"
                        autoComplete="current-password"
                        secureTextEntry={true}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorText>
                        {error?.message}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                )}
              />
            </View>
            <Controller
              name="root.serverError"
              render={({ fieldState: { error } }) => (
                <FormControl isInvalid={!!error}>
                  <FormControlError>
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
            />
            <Button className="w-full" onPress={handleSubmit(submit)}>
              {isSubmitting && <ButtonSpinner />}
              <ButtonText>
                {isSubmitting ? "Logging in..." : "Login"}
              </ButtonText>
            </Button>

            <View className="mt-4 text-center text-sm">
              <Text>Don't have an account? </Text>
              <Link href="/signup?from=/login" className="underline">
                Sign up
              </Link>
            </View>
          </FormProvider>
        </VStack>
      </Card>
    </View>
  );
}
