import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Error occurred!!</h1>
        <h1 className="text-xl">{error.statusText || error.message}</h1>
      </div>
      <Link className="mt-4 text-primary" to="/">
        Go to Home Page
      </Link>
    </div>
  );
}
