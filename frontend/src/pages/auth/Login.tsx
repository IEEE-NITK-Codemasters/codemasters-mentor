import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FullScreenSpinner from "@/components/FullScreenSpinner";
import { login } from "@/helpers/auth/login";

export default function () {
  const {toast} = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  async function handleSignIn() {
    startTransition(async () => {
      const res = await login(email, password);
      const data = await res.json();
      if(res.ok) {
        navigate("/")
        return;
      }

      toast({
        title: "Error",
        variant: "destructive",
        description: data.msg
      })
    })
  }

  if(isPending) {
    return <FullScreenSpinner />
  }
  return (
    <>
      <div className="flex items-center justify-center dark:text-white pt-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-[28rem]">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your Email and password below to sign in
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
                type="password"
              />
            </div>
            <Button onClick={handleSignIn} className="w-full">Sign In</Button>
          </div>
          <div className="text-center text-sm">
            Don't have an account?
            <Link className="underline" to="/auth/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}