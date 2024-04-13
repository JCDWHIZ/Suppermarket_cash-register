"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const UseApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (
    method,
    url,
    token = null,
    headers = {},
    body = null
  ) => {
    setIsLoading(true);

    try {
      const axiosConfig = {
        method,
        url,
        data: body,
        headers: {
          ...headers,
          ...(token && { Authorization: `Bearer ${token}` }), // Include the token dynamically
        },
      };

      const response = await axios(axiosConfig);

      setData(response.data);
      setError(null);
      return response;
    } catch (error) {
      setData(null);
      setError(error.response ? error.response.data : error.message);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
};

export default UseApi;
