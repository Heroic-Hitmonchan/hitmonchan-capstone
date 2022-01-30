import { Provider } from "react-redux";
import { store } from './index';
import Routes from "./components/Routers";




export default function App() {

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }