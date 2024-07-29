import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export const getDatas = async (url: string) => {
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  try {
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error: any) {
    console.error(error);
    let err = error;
    if (error.response) {
      err = `[${error.response.status}] ${error.response.data.msg}`;
    }
    return err;
  }
};

export const verifyToken = async () => {
  const url = "/api/verifyToken";
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  try {
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error: any) {
    console.error(error);
    let err = error;
    if (error.response) {
      err = `[${error.response.status}] ${error.response.data.msg}`;
    }
    localStorage.removeItem("token");
    return err;
  }
};

export const importData = async (type: string, file: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${type}s/xlsx`;
  const headers = {
    "Content-Type": "form-data",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  const body = new FormData();
  body.append("file", file);
  try {
    const res = await axios.post(url, body, { headers });
    return res.data;
  } catch (error: any) {
    console.error(error);
    let err = error;
    if (error.response) {
      err = `[${error.response.status}] ${error.response.data.msg}`;
    }
    return err;
  }
};
