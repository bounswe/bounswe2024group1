import {
  ActionFunctionArgs,
  Form,
  Link,
  Navigate,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore, { signin } from "../services/auth";
import { z } from "zod";

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<
  z.inferFlattenedErrors<typeof loginSchema> | Response
> => {
  const formData = await request.formData();
  const usernameOrEmail = formData.get("usernameOrEmail") as string | null;
  const password = formData.get("password") as string | null;

  const parsed = loginSchema.safeParse({
    usernameOrEmail,
    password,
  });

  if (!parsed.success) {
    return parsed.error.flatten();
  }

  try {
    await signin(parsed.data);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      return {
        formErrors: [error.message],
        fieldErrors: {},
      };
    } else {
      return {
        formErrors: ["An unknown error occurred"],
        fieldErrors: {},
      };
    }
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/") as Response;
};

export default function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  const auth = useAuthStore();

  const navigation = useNavigation();
  const isLoggingIn = !!navigation.formData?.get("usernameOrEmail");

  const actionData = useActionData() as
    | Exclude<Awaited<ReturnType<typeof action>>, Response>
    | undefined;

  function getErrorLabel(field: keyof z.infer<typeof loginSchema>) {
    return actionData && actionData.fieldErrors[field] ? (
      <div className="text-sm text-red-500">
        {actionData.fieldErrors[field]!.join("\n")}
      </div>
    ) : null;
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="mx-auto max-w-sm">
        {auth.token && <Navigate to={from} />}
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" replace className="grid gap-4">
            <input type="hidden" name="redirectTo" value={from} />
            <div className="grid gap-2">
              <Label htmlFor="email">Email or username</Label>
              <Input
                id="email"
                name="usernameOrEmail"
                placeholder="m@example.com"
                required
              />
            </div>
            {getErrorLabel("usernameOrEmail")}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link to="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            {getErrorLabel("password")}
            {actionData && actionData.formErrors ? (
              <div className="text-sm text-red-500">
                {actionData.formErrors.join("\n")}
              </div>
            ) : null}
            <Button loading={isLoggingIn} type="submit" className="w-full">
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
