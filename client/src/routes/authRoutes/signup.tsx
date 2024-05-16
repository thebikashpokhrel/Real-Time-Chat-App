import { Link } from "react-router-dom";

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
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import {
  SignUpSchema,
  SignUpType,
} from "../../../../shared/schemas/user.schema";
import { useSignUpMutation } from "@/services/auth.services";

export function SignUpPage() {
  const [signUpData, setSignUpData] = useState<SignUpType>({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    username: "",
  });

  const { mutate } = useSignUpMutation({
    sucessFn: (response) => {
      toast.dismiss();
      toast.success(response.data.message);
    },
    errorFn: (response) => {
      toast.dismiss();
      toast.error(response.error);
    },
  });

  const handleSignUp = () => {
    const validatedSignUpData = SignUpSchema.safeParse(signUpData);

    if (!validatedSignUpData.success) {
      const errors = validatedSignUpData.error?.issues;
      toast.dismiss();
      toast.error(errors[0].message);
    } else {
      mutate(validatedSignUpData.data as SignUpType);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Toaster />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  value={signUpData.firstname}
                  onChange={(e) => {
                    setSignUpData((prev) => ({
                      ...prev,
                      firstname: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  value={signUpData.lastname}
                  onChange={(e) => {
                    setSignUpData((prev) => ({
                      ...prev,
                      lastname: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="max123"
                value={signUpData.username}
                onChange={(e) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                value={signUpData.email}
                onChange={(e) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={signUpData.password}
                onChange={(e) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSignUp}>
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
