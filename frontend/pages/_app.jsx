import { store } from '@store/configureStore';
import Layout from '@Container/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import '@assets/styles/globals.scss';
import '@assets/styles/utils.scss';
import '@assets/styles/font.scss';
import { useRouter } from 'next/router';
import AdminLayout from '@Container/AdminLayout/AdminLayout';
import { createContext, useState } from 'react';
import Loader from '@components/Loader/Loader';

export const LoaderContext = createContext();

function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading: loading, setLoading: setLoading }}>
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
        {
          router.pathname.includes("admin") ?
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
            : <Layout>
              <Component {...pageProps} />
            </Layout>
        }

      </Provider>
    </LoaderContext.Provider>
  )
}

export default App;
