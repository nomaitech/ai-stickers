import { useState } from "react";
import { toast } from "sonner";
import { useLoginMutation } from "../store/auth/authApi";
import { useDispatch } from "react-redux";
import { openRegister } from "../store/UI/uiSlice.ts";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [login, { isLoading /* , error */ }] = useLoginMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValid = /^\S+@\S+$/i.test(form.email);
    if (!emailValid || form.password.length < 6) {
      toast.error("Please enter a valid email and a password with 6+ chars");
      return;
    }
    try {
      await login(form).unwrap();
    } catch {
      toast.error("Authentication failed");
      console.error("Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex p-2 flex-col items-center gap-0">
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        className="px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <div className="flex gap-x-2 justify-between items-center">
        <button
          type="submit"
          className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-md hover:bg-primary/90 transition"
          disabled={isLoading}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => dispatch(openRegister())}
          className="text-sm text-muted-foreground underline cursor-pointer"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Login;
