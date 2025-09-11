import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { enableMocks } from '../constants/env';
import * as Sentry from "@sentry/react";
import Errortest from './components/Errortest';

Sentry.init({
  dsn: "https://9a63b5482a767312d2a1c79be1532c41@o4509955652517888.ingest.de.sentry.io/4509955672703056",
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
      <Errortest/>
    </StrictMode>,
  );
});