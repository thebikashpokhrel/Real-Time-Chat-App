import { useMutation } from "@tanstack/react-query";
import type {
  SignInType,
  SignUpType,
} from "../../../shared/schemas/user.schema";

import axios, { AxiosError, AxiosResponse } from "axios";

export type APIErrorMessage = {
  error: string;
};

const AUTH_API_URL = "http://localhost:8000/api/auth/";

const AUTH_API_ENDPOINTS = {
  signUp: AUTH_API_URL + "signup",
  signIn: AUTH_API_URL + "signin",
  signOut: AUTH_API_URL + "signout",
};

export const useSignUpMutation = ({
  sucessFn,
  errorFn,
}: {
  sucessFn: (res: AxiosResponse) => void;
  errorFn: (error: APIErrorMessage) => void;
}) => {
  return useMutation({
    mutationFn: (userData: SignUpType) => {
      return axios({
        method: "post",
        url: AUTH_API_ENDPOINTS["signUp"],
        data: userData,
      });
    },
    onSuccess: (res: AxiosResponse) => {
      sucessFn(res);
    },
    onError: (error: AxiosError) => {
      errorFn(error.response?.data as APIErrorMessage);
    },
  });
};

export const useSignInMutation = ({
  sucessFn,
  errorFn,
}: {
  sucessFn: (res: AxiosResponse) => void;
  errorFn: (error: APIErrorMessage) => void;
}) => {
  return useMutation({
    mutationFn: (userData: SignInType) => {
      return axios({
        method: "post",
        url: AUTH_API_ENDPOINTS["signIn"],
        data: userData,
      });
    },
    onSuccess: (res: AxiosResponse) => {
      sucessFn(res);
    },
    onError: (error: AxiosError) => {
      errorFn(error.response?.data as APIErrorMessage);
    },
  });
};
