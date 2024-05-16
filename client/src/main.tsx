import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/homeRoutes/root";
import ErrorPage from "./routes/error-page.tsx";
import { SignUpPage } from "./routes/authRoutes/signup.tsx";
import { SignInPage } from "./routes/authRoutes/signin.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoot from "./routes/appRoutes/root.tsx";
import Message from "./routes/appRoutes/Pages/message.tsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <RootPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AppRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "message/:messageId",
        element: <Message />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
