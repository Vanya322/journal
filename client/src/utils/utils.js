import Vue from "vue";
import lodash from "lodash";
import { store } from "../main"

export const API_SERVER = "http://localhost:8080/api";

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const bodyWithAuthHeader = () => ({
    headers: {
        Authorization: store.state.userModule.accessToken,
    },
});

export const handleHttpError = (e) => {
    let message = e.response ? e.response.data.message : e;
    Vue.toasted.error(message, { ...dismissAction });
};

export const dismissAction = {
    action: {
        text: "Закрыть",
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        },
    },
};

export const dateTimeMomentFormat = "MMM Do YY HH:mm:ss";
export const dateMomentFormat = "MMM Do YY";
export const defaultDateFormat = "YYYY-MM-DD";
export const defaultScheduleFormat = "DD.MM.YYYY";

export const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, data);
};
export const getLocalStorageData = (key) => {
    return localStorage.getItem(key);
};

export const USER_TYPE_MEMBER = {
    text: "Пользователь",
    value: "MEMBER",
}
export const USER_TYPE_ADMIN = {
    text: "Администратор",
    value: "ADMIN",
}
export const USER_TYPES = lodash.keyBy([
    USER_TYPE_MEMBER,
    USER_TYPE_ADMIN,
], "value");
