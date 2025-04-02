import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <div className="container max-w-md px-4">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-gray-100 p-4">
            <FileQuestion className="h-45 w-45 text-gray-700" />
          </div>
        </div>
        <h1 className="mb-2 text-4xl text-primary font-extrabold tracking-tight">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/70">
          <Link to="/" className="text-white no-underline">
            Return to Home
          </Link>
        </button>
      </div>
    </div>
  );
}
