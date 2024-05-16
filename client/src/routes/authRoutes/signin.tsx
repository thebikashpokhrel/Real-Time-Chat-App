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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInSchema,
  SignInType,
} from "../../../../shared/schemas/user.schema";
import { useSignInMutation } from "@/services/auth.services";
import toast, { Toaster } from "react-hot-toast";

export function SignInPage() {
  const [signInData, setSignInData] = useState<SignInType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mutate } = useSignInMutation({
    sucessFn: (response) => {
      toast.dismiss();
      navigate("/");
    },
    errorFn: (response) => {
      toast.dismiss();
      toast.error(response.error);
    },
  });

  const handleSignIn = () => {
    const validatedSignInData = SignInSchema.safeParse(signInData);

    if (!validatedSignInData.success) {
      const errors = validatedSignInData.error?.issues;
      toast.dismiss();
      toast.error(errors[0].message);
    } else {
      mutate(validatedSignInData.data as SignInType);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Toaster />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                value={signInData.email}
                onChange={(e) => {
                  setSignInData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={signInData.password}
                onChange={(e) => {
                  setSignInData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
