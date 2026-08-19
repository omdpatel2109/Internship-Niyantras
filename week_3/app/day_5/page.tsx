import { use, Suspense } from "react";
/* The use() hook in React 19 allows a component to read a Promise directly and 
   suspend rendering until the Promise resolves. Unlike useEffect + useState, 
   we don't need to manually store the fetched result and update the state; 
   <Suspense> can display the loading UI while the Promise is pending. */

function getUser() {
  return new Promise<{ name: string; age: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John",
        age: 25,
      });
    }, 2000);
  });
}

const userPromise = getUser();

function User() {
    const user = use(userPromise);

    return (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
                User Information
            </h2>

            <div className="space-y-3">
                <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg font-semibold text-blue-700">
                        {user.name}
                    </p>
                </div>

                <div className="rounded-lg bg-purple-50 p-4">
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-lg font-semibold text-purple-700">
                        {user.age}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-10">
            <div className="mx-auto max-w-xl rounded-2xl bg-gray-50 p-8 shadow-xl">
                
                <p className="mt-3 text-center text-gray-600">
                Reading Promise data using the use() hook
                </p>

                <Suspense
                    fallback={
                        <div className="mt-6 rounded-xl bg-white p-8 text-center shadow-lg">

                            <p className="text-lg font-medium text-gray-700">
                                Loading user...
                                Please wait while the Promise resolves.
                            </p>

                        </div>
                    }
                    >
                    <User />
                </Suspense>

            </div>
        </main>
    );
}