import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HlnqeEKXqd9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function ErrorPage() {
  const error: any = useRouteError();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Error occurred!!</h1>
        <h1 className="text-xl">{error.statusText || error.message}</h1>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-6 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#4c6fff]"
          to="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
