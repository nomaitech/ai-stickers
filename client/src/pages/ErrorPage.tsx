
const ErrorPage = () => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
      type="button"
      onClick={() => {
    throw new Error("Sentry Test Error");
      }}
    >
      Break the world
    </button>
  );
};

export default ErrorPage;
