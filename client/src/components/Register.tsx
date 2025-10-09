import { useState } from "react";
import { toast } from "sonner";
import { useRegisterMutation } from "../store/auth/authApi";
import { useDispatch } from "react-redux";
import { closeRegister } from "../store/UI/uiSlice";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RequestData = {
  email: string;
  password: string;
};

const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [registerMutation /*{ isLoading, error }*/] = useRegisterMutation();

  const validate = (f: FormData) => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!f.email) e.email = "Email is required";
    else if (!/^\S+@\S+$/i.test(f.email)) e.email = "Invalid email";
    if (!f.password) e.password = "Password is required";
    else if (f.password.length < 6) e.password = "Minimum 6 characters";
    if (!f.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (f.confirmPassword !== f.password) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    try {
      await registerMutation({
        email: form.email,
        password: form.password,
      } as RequestData).unwrap();
      toast.success("Register successful");
      dispatch(closeRegister());
    } catch (err: unknown) {
      const anyErr = err as { status?: number; data?: { detail?: string } } | undefined;
      if (anyErr?.status === 400 && anyErr?.data?.detail === "Email already registered") {
        toast.error("Email already registered");
      } else {
        toast.error("Register failed");
        console.error("Register failed");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={() => dispatch(closeRegister())}
    >
      <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-xl border border-border w-full max-w-sm">
          <h2 className="text-lg font-semibold text-primary mb-6 text-center">Register</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
