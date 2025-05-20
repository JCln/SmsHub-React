import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fallback from './components/fallback';
import { ErrorBoundary } from 'react-error-boundary';

function logErrorToService(error: any) {
  // Use your preferred error logging service
  console.error("Caught an error:", error);
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ErrorBoundary FallbackComponent={Fallback} onError={logErrorToService}>
    {/* <React.StrictMode>  Strict mode cause program to run twice at startup*/}
    <ToastContainer />
    <App />
    {/* </React.StrictMode> */}
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
