// src/constants/endPoints.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const END_POINTS = {
  // company endpoints
  CREATE_COMPANY: `${API_BASE_URL}/company/create-company`,
  GET_ALL_COMPANIES: `${API_BASE_URL}/company/get-all-companies`,
  // user endpoints
  CREATE_USER: `${API_BASE_URL}/user/create-user`,
  GET_ALL_USERS: `${API_BASE_URL}/user/get-all-users`,
  // form endpoints
  CREATE_FORM: `${API_BASE_URL}/form/create-form`,
  GET_ALL_FORMS: `${API_BASE_URL}/form/get-all-forms`,
};
