import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function RootPage() {
  return (
    <div className="h-[100vh] flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Chat App</h1>
      <div className="flex gap-2">
        <Button asChild className="bg-primary font-bold">
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button asChild className="bg-primary font-bold">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
