import { Home, ShieldX } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-destructive/10 p-4">
            <ShieldX className="h-12 w-12 text-destructive" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Unauthorized Access
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            You do not have permission to access this page.
          </p>

          <Button asChild className="mt-6 w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;