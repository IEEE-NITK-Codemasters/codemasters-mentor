import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! Some Error Occured.
      </p>
      <Button>
        <Link
            to="/"
        >
            Go Back Home
        </Link>
      </Button>
    </div>
  );
}
