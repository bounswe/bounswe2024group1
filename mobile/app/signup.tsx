import {
  Href,
  Link,
  Redirect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";

import {
  Button,
  ButtonSpinner,
  ButtonText,
  Card,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  VStack,
} from "@/components/ui";
import { fetchSignUp } from "@/services/api/programmingForumComponents";
import {
  FetchError,
  setFormErrors,
} from "@/services/api/programmingForumFetcher";
import useAuthStore from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ScrollView, View } from "react-native";
import { z } from "zod";
const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  country: z.string().min(1),
  redirectTo: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const { from = "" } = useLocalSearchParams<{ from?: string }>();

  const auth = useAuthStore();

  const form = useForm<SignupFormData>({
    defaultValues: {
      redirectTo: from,
      country: "",
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const {
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting, errors },
  } = form;

  console.log(errors);
  const nvg = useNavigation();
  const submit: SubmitHandler<SignupFormData> = async ({
    redirectTo,
    ...data
  }): Promise<void> => {
    try {
      await fetchSignUp({
        body: { ...data, experienceLevel: "BEGINNER" },
      });
      if (redirectTo) nvg.navigate(redirectTo as never);
    } catch (e) {
      setFormErrors(e as FetchError, setError);
    }
  };
  return (
    <ScrollView contentContainerClassName="flex flex-1 items-center justify-center">
      <Card className="mx-auto max-w-sm">
        {auth.token && <Redirect href={from as Href} />}
        <View className="mb-6">
          <Text className="text-xl">Sign Up</Text>
          <Text>Enter your information to create an account</Text>
        </View>
        <FormProvider {...form}>
          <VStack space="lg">
            <View className="grid gap-2">
              <Controller
                control={control}
                name="firstName"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl size="md" isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>First name</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="John"
                        autoComplete="given-name"
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
            <View className="grid gap-2">
              <Controller
                control={control}
                name="lastName"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl size="md" isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>Last name</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="Doe"
                        autoComplete="family-name"
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
            <View className="grid gap-2">
              <Controller
                control={control}
                name="username"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl size="md" isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>Username</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="john_doe"
                        autoComplete="username"
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
            <View className="grid gap-2">
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl size="md" isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="m@example.com"
                        autoComplete="email"
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
            <View className="grid gap-2">
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl size="md" isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="password"
                        autoComplete="new-password"
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
            <View className="grid gap-2">
              <Controller
                control={control}
                name="country"
                render={({
                  field: { onBlur, onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl size="md" isInvalid={!!error}>
                    <FormControlLabel>
                      <FormControlLabelText>Country</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="sm">
                      <InputField
                        placeholder="TR"
                        autoComplete="country"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                    <FormControlHelper>
                      <FormControlHelperText>
                        Please enter your country code
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
                {isSubmitting ? "Creating account..." : "Create an account"}
              </ButtonText>
            </Button>
          </VStack>
          <View className="mt-4 text-center text-sm">
            <Text>Already have an account?</Text>
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </View>
        </FormProvider>
      </Card>
    </ScrollView>
  );
}
