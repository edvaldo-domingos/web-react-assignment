import axios from "axios";
import { headers } from "../../../utils/api";
import { BREWER_API_URL } from "../../../utils/constants";

export default class BrewersDataSource {
  dataSource = null;

  constructor(_dataSource) {
    this.dataSource = _dataSource;
  }

  async getBrewers({ skip = 0, limit = undefined }) {
    try {
      const url = `${BREWER_API_URL}/?skip=${skip}${
        limit ? "&limit=" + limit : ""
      }`;
      const { data } = await axios.get(url, {
        headers,
      });
      return { result: data, error: null };
    } catch (error) {
      console.log(error.message);
      return {
        result: null,
        error:
          error?.response?.data?.detail ||
          error?.message ||
          "Failed to fetch brewers",
      };
    }
  }

  async getBrewer(id) {
    try {
      const url = `${BREWER_API_URL}/${id}`;
      const { data } = await axios.get(url, {
        headers,
      });

      return { result: data, error: null };
    } catch (error) {
      console.log(error);
      return {
        result: null,
        error:
          error?.response?.data?.detail ||
          error?.message ||
          "Failed to get brewer",
      };
    }
  }

  async deleteBrewer(id) {
    try {
      const url = `${BREWER_API_URL}/${id}`;
      const { data } = await axios.delete(url, {
        headers,
      });

      return { result: data, error: null };
    } catch (error) {
      console.log(error);
      return {
        result: null,
        error:
          error?.response?.data?.detail ||
          error?.message ||
          "Failed to delete brewer",
      };
    }
  }

  async createBrewer(payload) {
    try {
      const url = `${BREWER_API_URL}`;
      const { data } = await axios.post(url, payload, {
        headers,
      });

      return { result: data, error: null };
    } catch (error) {
      console.log(error);
      return {
        result: null,
        error:
          error?.response?.data?.detail ||
          error?.message ||
          "Failed to create brewer",
      };
    }
  }
}
