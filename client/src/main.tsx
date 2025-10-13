import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import './global.css'
import App from './App.tsx'
import { enableMocks, sentryDSN } from './env.ts';
import * as Sentry from "@sentry/react";
import { Provider as ChakraProvider } from "@/components/ui/provider"


Sentry.init({
  dsn: sentryDSN,
  environment: import.meta.env.MODE
});

const prepareMocks = async () => {
  if (enableMocks) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: "bypass"
    });
  }
}

prepareMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </StrictMode>,
  );
});