import { useState, useCallback } from "react";
import axios from "axios";

export const CONTENT_TYPE_MULTIPART_FORM = "multipart/form-data";
export const CONTENT_TYPE_JSON = "application/json";

const useHtpp = () => {
  // const { afterLogoutHandler, getToken } = useAuth();
  const getToken = () => {};

  const [loading, setLoading] = useState(false);

  const clear = useCallback(() => setLoading(false), []);

  const sendRequest = useCallback(
    async ({
      url,
      method,
      body = null,
      contentType = CONTENT_TYPE_JSON,
      isErrorHandle = true,
      allowCredentials = false,
      queryParams,
      onUploadProgress,
    }) => {
      setLoading(true);
      const token = getToken();
      const config = {
        url,
        method,
        data: body,
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": `${allowCredentials}`,
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers": "X-Requested-With,content-type",
        },
        params: queryParams,
        onUploadProgress,
      };
      console.log("config : ", config);
      const httpResponse = await axios(config)
        .then((response) => {
          setLoading(false);
          return response;
        })
        .catch((error) => {
          // TODO : Hatalar bunun altında hazırlanacak 404, 500, 502, 503... gibi
          if (!error.response) {
            console.log(error);
          } else {
            if (error.response.status === 401) {
              console.log("401 yedik");
            }
            throw error;
          }
        });

      return httpResponse;
    }
  );

  return {
    isLoading: loading,
    sendRequest,
    clear,
  };
};

export default useHtpp;
