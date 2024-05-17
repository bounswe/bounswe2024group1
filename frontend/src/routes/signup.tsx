import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import useAuthStore from "../services/auth";
import { fetchSignup } from "../services/api/semanticBrowseComponents";
import {
  FetchError,
  setFormErrors,
} from "../services/api/semanticBrowseFetcher";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  const auth = useAuthStore();

  const form = useForm<SignupFormData>({
    defaultValues: {
      redirectTo: from,
      country: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const {
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting },
  } = form;

  const navigate = useNavigate();
  const submit: SubmitHandler<SignupFormData> = async ({
    redirectTo,
    ...data
  }): Promise<void> => {
    try {
      await fetchSignup({
        body: data,
      });
      if (redirectTo) navigate(redirectTo);
    } catch (e) {
      setFormErrors(e as FetchError, setError);
    }
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="mx-auto max-w-sm">
        {auth.token && <Navigate to={from} />}
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(submit)} className="grid gap-4">
              <input type="hidden" name="redirectTo" value={from} />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            autoComplete="given-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            autoComplete="family-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john_doe"
                          autoComplete="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          autoComplete="current-password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="country"
                          placeholder="TR"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your country code
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="root.serverError"
                render={() => <FormMessage />}
              />
              <Button loading={isSubmitting} type="submit" className="w-full">
                Create an account
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
