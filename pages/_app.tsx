import React, { useEffect } from "react";

import "bootstrap/scss/bootstrap.scss";
import "../public/scss/default/euclid-circulara.scss";

// ========= Plugins CSS START =========
import "../node_modules/sal.js/dist/sal.css";
import "../public/css/plugins/fontawesome.min.css";
import "../public/css/plugins/feather.css";
import "../public/css/plugins/odometer.css";
import "../public/css/plugins/animation.css";
import "../public/css/plugins/euclid-circulara.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
// ========= Plugins CSS END =========

import "../public/scss/styles.scss";
import store, { persistor } from '../redux/store'
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import ModalManager from "@/ui/Modal/ModalManager";
import { ToastContainer } from "react-toastify";
import AuthGuard from "@/pages/auth/AuthGuard";
import { PersistGate } from "redux-persist/integration/react";
// import "../public/scss/rtl-styles.scss";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AuthGuard>
        <Component {...pageProps} />
        <ToastContainer />
        <ModalManager />
      </AuthGuard>
      </PersistGate>
    </Provider>
  );
}
