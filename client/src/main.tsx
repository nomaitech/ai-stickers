import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { enableMocks, sentryDSN } from '../constants/env';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: sentryDSN,
  environment: "development",
  sendDefaultPii: true
});

const prepareMocks = async () => {
  if (enableMocks) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      }
    });
  }
}

prepareMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});