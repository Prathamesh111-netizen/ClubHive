import { store } from "@store/configureStore";
import Layout from "@Container/Layout/Layout";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.min.css";
import "@assets/styles/globals.scss";
import "@assets/styles/utils.scss";
import "@assets/styles/font.scss";
import { useRouter } from "next/router";
import AdminLayout from "@Container/AdminLayout/AdminLayout";
import { createContext, useEffect, useState } from "react";
import Loader from "@components/Loader/Loader";
// import "./../firebase";
// import { getToken2 } from "./../firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { async } from "@firebase/util";
// import { Toast } from "react-toastify/dist/components";
// import { Toast } from "react-toastify/dist/components";
const firebaseConfig = {
  apiKey: "AIzaSyBUo8b-FaWsc8ugPSyhnXWIVff5eTbiG7E",
  authDomain: "clubhive-d74f9.firebaseapp.com",
  projectId: "clubhive-d74f9",
  storageBucket: "clubhive-d74f9.appspot.com",
  messagingSenderId: "450655771134",
  appId: "1:450655771134:web:acb2973c80af47a36888af",
  measurementId: "G-3HTY62GLR5",
};
export const LoaderContext = createContext();
export const getToken2 = (setTokenFound, messaging) => {
  return getToken(messaging, {
    vapidKey:
      "BMr8HeGWqSE5-X4CCg50qngyBZAZDfHtJcXb-564F9cXKrhJxBqsdqEE-laPLfOqu5IgVcSTn4fZXUDq3qgGQxg",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = (messaging) =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
    getToken2(setTokenFound, messaging);
    onMessageListener(messaging)
      .then((payload) => {
        // setShow(true);
        // setNotification({
        //   title: payload.notification.title,
        //   body: payload.notification.body,
        // });
        console.log("payload");
        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return (
    <LoaderContext.Provider
      value={{ loading: loading, setLoading: setLoading }}
    >
      <Provider store={store}>
        {loading && <Loader />}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {router.pathname.includes("admin") ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Provider>
    </LoaderContext.Provider>
  );
}

export default App;
