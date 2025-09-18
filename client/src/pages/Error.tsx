const Error = () => {
  return (
    <button
      type="button"
      onClick={() => {
    // @ts-expect-error test
    throw new Error("Sentry Test Error");
      }}
    >
      Break the world
    </button>
  );
};

export default Error;
