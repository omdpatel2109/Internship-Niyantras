import LoginForm from "@/feature/login/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="border rounded-md p-8 w-100 bg-gray-100"> 
            <h1 className="text-xl mb-3 border-b p-2">Login</h1>    
            <LoginForm />
        </div>
    </div>
  );
}