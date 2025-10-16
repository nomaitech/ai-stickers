export const domainUrl = import.meta.env.VITE_API_URL || "";
export const enableMocks = import.meta.env.VITE_ENABLE_MSW == "true";
export const sentryDSN = import.meta.env.VITE_SENTRY_DSN || "";