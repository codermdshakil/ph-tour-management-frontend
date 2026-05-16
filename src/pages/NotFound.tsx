// pages/NotFound.tsx

import { Home, TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="mb-6 rounded-full bg-destructive/10 p-5">
            <TriangleAlert className="h-14 w-14 text-destructive" />
          </div>

          <h1 className="text-6xl font-extrabold tracking-tight">404</h1>

          <h2 className="mt-2 text-2xl font-semibold">
            Page Not Found
          </h2>

          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>

          <Button asChild size="lg" className="mt-8 w-full">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Go Back Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;