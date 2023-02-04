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

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
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
  )
}

export default App;
