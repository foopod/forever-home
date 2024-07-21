import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GameContextProvider } from './context/GameContext.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './Dashboard.tsx';

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://eba10b17e2fcbbcbb02554c2d2d1b808@o178200.ingest.us.sentry.io/4507636637368320",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/forever\.johncave\.co\.nz/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

document.body.addEventListener("error", (event : ErrorEvent) => {
  if (!event.target) return;

  if (event.target instanceof HTMLElement){
    if (event.target.tagName === 'IMG') {
      Sentry.captureMessage(`Failed to load image: ${event.target.getAttribute('src')}`, "warning");
    } else if (event.target.tagName === 'LINK') {
      Sentry.captureMessage(`Failed to load css: ${event.target.getAttribute('href')}`, "warning");
    }
  }
}, true);


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameContextProvider>
      <RouterProvider router={router} />
    </GameContextProvider>
  </React.StrictMode>,
)
