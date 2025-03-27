import { store } from "../app/store";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import Navbar from "../app/components/Navbar";

export default function App({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
