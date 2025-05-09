// src/services/apiServices/companyServices.js

import axios from "axios";
import { END_POINTS } from "../../constants/endPoints";

// POST: Create a new company
export const createCompanyService = async (data) => {
  const response = await axios.post(END_POINTS.CREATE_COMPANY, data);
  return response.data;
};

// GET: Fetch all companies
export const getAllCompaniesService = async () => {
  const response = await axios.get(END_POINTS.GET_ALL_COMPANIES);
  return response.data;
};