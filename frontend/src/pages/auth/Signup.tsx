import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import FullScreenSpinner from "@/components/FullScreenSpinner";
import { useNavigate } from "react-router-dom";
import {signUp} from "@/helpers/auth/signup"

export default function () {
  const {toast} = useToast()
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass,setConfirmPass] = useState("")
  const navigate = useNavigate();

  async function handleSignUp() {

    if(password !== confirmPass) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Passwords do not match"
      })
      return;
    }

    startTransition(async () => {
      const res = await signUp(username,email,password);
      const data = await res.json();
      if(res.ok) {
        navigate("/auth/signin");
        return;
      }

      toast({
        title: "Error",
        variant: "destructive",
        description: data.msg
      })
    })
  }

  return (
    <>
    {isPending && <FullScreenSpinner />}
      <div className="flex items-center justify-center dark:text-white pt-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-[28rem]">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Create New Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your username , email and password below to create a new account
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                type="email"
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
            <div className="space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                onChange={(e) => setConfirmPass(e.target.value)}
                id="password"
                required
                type="password"
              />
            </div>
            <Button onClick={handleSignUp} className="w-full">Sign Up</Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?
            <Link className="underline" to="/auth/signin">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}