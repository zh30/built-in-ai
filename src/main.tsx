import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'atropos/css';
import './globals.css';
import Root from './routes/root.tsx';
import ErrorPage from './error-page.tsx';
// import Genai from './routes/genai.tsx';
// import { TonConnectUIProvider } from '@tonconnect/ui-react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
        errorElement: <ErrorPage />,
      },
      // {
      //   path: "genai",
      //   element: <Genai />,
      //   errorElement: <ErrorPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <TonConnectUIProvider manifestUrl="https://react19.zhanghe.dev/tonconnect-manifest.json"> */}
    <RouterProvider router={router} />
    {/* </TonConnectUIProvider> */}
  </React.StrictMode>,
)
