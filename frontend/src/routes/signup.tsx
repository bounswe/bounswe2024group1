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
import { z } from "zod";
import useAuthStore, { signup } from "../services/auth";

const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  country: z.string().min(1),
});

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<
  z.inferFlattenedErrors<typeof signupSchema> | Response
> => {
  const formData = await request.formData();

  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const username = formData.get("username") as string | null;
  const firstName = formData.get("firstName") as string | null;
  const lastName = formData.get("lastName") as string | null;
  const country = formData.get("country") as string | null;

  const parsed = signupSchema.safeParse({
    email,
    password,
    username,
    firstName,
    lastName,
    country,
  });

  if (!parsed.success) {
    return parsed.error.flatten();
  }

  try {
    await signup(parsed.data);
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
  return redirect(redirectTo || "/");
};

export default function Signup() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  const auth = useAuthStore();

  const navigation = useNavigation();
  const isSigningUp = !!navigation.formData?.get("email");

  const actionData = useActionData() as
    | Exclude<Awaited<ReturnType<typeof action>>, Response>
    | undefined;

  function getErrorLabel(field: keyof z.infer<typeof signupSchema>) {
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
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="grid gap-4">
            <input type="hidden" name="redirectTo" value={from} />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  name="firstName"
                  id="first-name"
                  placeholder="Max"
                  required
                />
                {getErrorLabel("firstName")}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  name="lastName"
                  id="last-name"
                  placeholder="Robinson"
                  required
                />
                {getErrorLabel("lastName")}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input name="username" id="username" type="username" />
              {getErrorLabel("username")}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              {getErrorLabel("email")}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
              {getErrorLabel("password")}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input name="country" id="country" type="country" />
              {getErrorLabel("country")}
            </div>
            {actionData && actionData.formErrors ? (
              <div className="text-sm text-red-500">
                {actionData.formErrors.join("\n")}
              </div>
            ) : null}
            <Button loading={isSigningUp} type="submit" className="w-full">
              Create an account
            </Button>
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
