import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import useAuthStore from "../services/auth";
import { z } from "zod";
import { fetchLogin } from "@/services/api/programmingForumComponents";
import {
  FetchError,
  setFormErrors,
} from "../services/api/programmingForumFetcher";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  redirectTo: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

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
    formState: { isSubmitting },
  } = form;

  const navigate = useNavigate();
  const submit: SubmitHandler<LoginFormData> = async ({
    redirectTo,
    ...data
  }): Promise<void> => {
    try {
      const response = await fetchLogin({
        body: data,
      });
      if (response.token) {
        useAuthStore.getState().setToken(response.token);
        if (redirectTo) navigate(redirectTo);
      }
    } catch (e) {
      setFormErrors(e as FetchError, setError);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="mx-auto max-w-sm">
        {/*auth.token && <Navigate to={from} />*/}
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(submit)} className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="usernameOrEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or username</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        You can use your email or username to log in.
                      </FormDescription>
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
              <FormField
                name="root.serverError"
                render={() => <FormMessage />}
              />
              <Button loading={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup?from=/login" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
