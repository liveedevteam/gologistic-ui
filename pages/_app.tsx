import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@/styles/globals.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from '../contexts/AuthContext'

import "react-datepicker/dist/react-datepicker.css";

export default function App({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>;
}
