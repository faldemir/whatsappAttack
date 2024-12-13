import axios from "axios";
import appConfig from "configs/app.config";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "constants/api.constant";
import { getAccessToken } from "services/getAccessToken";
import store from "../store"; // Importa el store directamente
import { onSignOutSuccess } from "../store/auth/sessionSlice";
import { PERSIST_STORE_NAME } from "constants/app.constant";
import deepParseJson from "utils/deepParseJson";
import {toast, Notification} from 'components/ui';

const unauthorizedCode = [401];

const BaseService = axios.create({
  // timeout: 3000,
  // baseURL: appConfig.apiPrefix,
  baseURL:["http://142.93.193.118:8003/api/notification/count", appConfig.apiPrefix ],
});
BaseService.interceptors.response.use(
  response => response, // Pass through successful responses
  error => {
      handleNetworkError(error); // Handle errors
      return Promise.reject(error); // Reject to propagate errors
  }
);

// Function to handle network errors
const handleNetworkError = (error) => {
  if (!error.response) {
      // No response from server (network error)
    //   toast.error('Cannot connect to the backend. Please check your connection.');
      toast.push(
      <Notification title="Error" type="danger" duration={3500}>
        Cannot connect to the backend. Please check your connection.
      </Notification>,{
        placement: 'top-center'
      })
  } else if (error.code === 'ECONNABORTED') {
      // Timeout error
    //   toast.error('Request timed out. Please try again.');
      toast.push(<Notification title="Error" type="danger" duration={3500}>
        Request timed out. Please try again.
      </Notification>,{
        placement: 'top-center'
      })
  } else {
      // Other server errors
      switch (error.response.status) {
          case 404:
              toast.push(
                <Notification title="Error" type="danger" duration={3500}>
                    Requested resource not found (404).
                </Notification>
            ,{
                placement: 'top-center'
            })
              break;
          case 500:
              toast.push(
                <Notification title="Error" type="danger" duration={3500}>
                    Internal Server Error (500).
                </Notification>
            ,{
                placement: 'top-center'
            })
              break;
          case 503:
              toast.push(
                <Notification title="Error" type="danger" duration={3500}>
                    Service unavailable (503).
                </Notification>
            ,{
                placement: 'top-center'
            })
              break;
          default:
              toast.error(`Error: ${error.response.statusText} (${error.response.status}).`);
              toast.push(
                <Notification title="Error" type="danger" duration={3500}>
                    Error: {error.response.statusText} ({error.response.status}).
                </Notification>
            ,{
                placement: 'top-center'
            })
      }
  }
};



export default BaseService;
