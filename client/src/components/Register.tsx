import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterMutation } from "../store/auth/authApi";
import { useDispatch } from "react-redux";
import { closeRegister } from "../store/UI/uiSlice";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<FormData>();
  const [ registerMutation, /*{ isLoading, error }*/] = useRegisterMutation();

    const onSubmit = async (formData: FormData) => {
      try{
        const result = await registerMutation(formData);
        //@ts-expect-error expect meta not to correspond with the api query
        const status = result.meta?.response?.status;
        if(status===201){
          toast.success("Register successful");
          dispatch(closeRegister());
        }else if (status===402){
          toast.error("Register failed");
          console.error("Register failed");
        }
      } catch{
        toast.error("Register failed");
        console.error("Register failed");
      }
  };

  const password = watch("password");

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={() => dispatch(closeRegister())}
    >
      <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-xl border border-border w-full max-w-sm"
        >
          <h2 className="text-lg font-semibold text-primary mb-6 text-center">
            Register
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
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
              <p className="text-destructive text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1"
            >
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
              <p className="text-destructive text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground mb-1"
            >
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
              <p className="text-destructive text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
