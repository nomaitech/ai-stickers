// @ts-expect-error bypass ts type checking on the any return from getState to avoid import cycles 
export const prepareAuthHeaders = (headers: Headers, { getState }) => {
  const token = getState().auth.access_token || localStorage.getItem("access_token");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
};