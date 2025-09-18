import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../store/auth/authApi";
import { useDispatch } from "react-redux";
import { openRegister } from "../store/UI/uiSlice.ts";

type FormData = {
  email: string;
  password: string;
};

type Props = {
  updateCredits: () => void;
};

const Login = ({ updateCredits }: Props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<FormData>();
  const [login, { isLoading, /* error */ }] = useLoginMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data).unwrap();
      updateCredits();
    } catch {
      toast.error("Authentication failed");
      console.error("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex p-2 flex-col items-center gap-0"
    >
      <input
        type="email"
        placeholder="Email"
        className="px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="password"
        placeholder="Password"
        className="px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
        {...register("password", { required: true, minLength: 6 })}
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
