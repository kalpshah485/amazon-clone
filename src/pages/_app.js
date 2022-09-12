import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import { Provider as AuthProvider } from 'next-auth/client';
import { useEffect } from 'react';
import { useSetDataToBasket } from "../assets/utils";

const MyApp = ({ Component, pageProps }) => {

  const dispatch = store.dispatch;

  useEffect(() => {
    const localStorageItems = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    useSetDataToBasket(dispatch, localStorageItems)
  }, [])

  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
