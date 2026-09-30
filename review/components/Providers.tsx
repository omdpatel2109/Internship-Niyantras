"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Query client is the object that manage the api data,cache,loading,error 
//queryClientProvider is that queryClient available to the component below it
import { useState } from "react";

export default function Providers({children,}: {children: React.ReactNode;}) { // we can wrap any component in this becuasse of this children and can used this
  const [queryClient] = useState(() => new QueryClient()); // useState for we create one query client and keep using the same one

  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}