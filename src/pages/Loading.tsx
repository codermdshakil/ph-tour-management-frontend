// components/ui/loading.tsx

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-75 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />

        <p className="text-sm text-muted-foreground">
             Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;