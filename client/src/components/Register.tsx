import { useForm } from "react-hook-form";
import { toast } from 'sonner';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  hideRegister: () => void;
};

const Register = ({ hideRegister }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if(response.ok){
      toast.success('User registered');
      hideRegister();
    }
  };

  const password = watch("password");

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl border border-border w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold text-primary mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition"
        >
          Register
        </button>
      </form>
  );
};

export default Register;
