import axios from 'axios';
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:6000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // stop global loader here
        return ProcessResponse(response);
    },
    function (error) {
        // stop global loader here
        return Promise.reject(processError(error));
    }
);

const ProcessResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        };
    }
};

const processError = (error) => {
    if (error.response) {
        // Request made and server responded with a status other
        // than falls out of the range 2.x.x
        console.log('Error in RESPONSE:', error.toJSON());
        return {
            isFailure: true,
            message: API_NOTIFICATION_MESSAGE.responseFailure,
            code: error.response.status,
        };
    } else if (error.request) {
        // Request Made but no response was received
        console.log('Error in REQUEST:', error.toJSON());
        return {
            isFailure: true,
            message: API_NOTIFICATION_MESSAGE.requestFailure,
            code: '',
        };
    } else {
        // Something happened in setting up request that triggers an error
        console.log('Error in NETWORK:', error.toJSON());
        return {
            isFailure: true,
            message: API_NOTIFICATION_MESSAGE.networkError,
            code: '',
        };
    }
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },
        });
    };
}

export { API };
