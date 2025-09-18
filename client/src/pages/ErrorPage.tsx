
const ErrorPage = () => {
  return (
    <button
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
