/* eslint-disable no-console */
import { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from '../../shared/axios/Axios';
import ErrorContext from '../../context/error/ErrorContext';
import useToast from '../toast/useToast';
import Environment from '../../environment';
import useAuth from '../useAuth';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const CONTENT_TYPE_MULTIPART_FORM = 'multipart/form-data';
export const CONTENT_TYPE_JSON = 'application/json';

const useHttp = () => {
    const { afterLogoutHandler, getToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { dispatchErrorState } = useContext(ErrorContext);

    const { showToast } = useToast();

    const clear = useCallback(() => setLoading(false), []);

    const sendRequest = useCallback(
        async ({
            url,
            method,
            body = null,
            contentType = CONTENT_TYPE_JSON,
            isErrorHandle = true,
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
                    'Content-Type': contentType,
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods':
                        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                },
                withCredentials: true,
                params: queryParams,
                onUploadProgress,
            };

            const httpResponse = await Axios(config)
                .then((response) => {
                    setLoading(false);
                    return response;
                })
                .catch((error) => {
                    if (!error.response) {
                        showToast({
                            severity: 'error',
                            summary: 'A?? veya Sunucu hatas??',
                            showDetail: false,
                            life: 3000,
                        });
                        history.replace(`${Environment.CONTEXT_PATH}/sunucu-hatasi`, null);
                    } else {
                        if (error.response.status === 400) {
                            console.error(error.response.data);
                            showToast({
                                severity: 'warn',
                                summary:
                                    'Hatal?? giri?? yapt??n??z, kullan??c?? ad?? ve ??ifrenizi kontrol ediniz.',
                                showDetail: false,
                                life: 3000,
                            });
                        } else if (error.response.status === 401) {
                            if (
                                error.response?.data?.detail?.toLowerCase() ===
                                'bad credentials'
                            ) {
                                showToast({
                                    severity: 'warn',
                                    summary:
                                        'Hatal?? giri?? yapt??n??z, kullan??c?? ad?? ve ??ifrenizi kontrol ediniz.',
                                    showDetail: false,
                                    life: 3000,
                                });
                            } else {
                                showToast({
                                    severity: 'warn',
                                    summary: 'Oturumunuz sonland??r??lm????t??r.',
                                    showDetail: false,
                                    life: 3000,
                                });
                            }
                            afterLogoutHandler();
                        } else if (error.response.status === 403) {
                            showToast({
                                severity: 'error',
                                summary: error.response.data.message,
                                showDetail: false,
                                life: 3000,
                            });
                            history.replace(`${Environment.CONTEXT_PATH}/main`);
                        } else if (error.response.status === 500 && isErrorHandle && config.url !== Environment.VOICE_API.TASK_EXAMINES) {
                            dispatchErrorState({
                                type: 'SET_ERROR',
                                message: error.response.data.message,
                                code: error.response.status,
                                id: error.response.data.errorId,
                            });
                        }
                        throw error;
                    }
                });

            return httpResponse;
        },
        [dispatchErrorState, history]
    );

    return {
        isLoading: loading,
        sendRequest,
        clear,
    };
};

export default useHttp;