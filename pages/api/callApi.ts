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

export const getDataById = async (type: string, id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${type}s/${id}`;
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

export const postData = async (type: string, data: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${type}s`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  try {
    const res = await axios.post(url, data, { headers });
    return res.data;
  } catch (error: any) {
    console.error(error);
    let err = error;
    if (error.response) {
      err = `[${error.response.status}] ${error.response.data.msg}`;
    }
    return err;
  }
}

export const putData = async (type: string, id: string, data: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${type}s/${id}`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  try {
    const res = await axios.put(url, data, { headers });
    return res.data;
  } catch (error: any) {
    console.error(error);
    let err = error;
    if (error.response) {
      err = `[${error.response.status}] ${error.response.data.msg}`;
    }
    return err;
  }
}

export const getMediaDataById = async (type: string, id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${type}s/media/${id}`;
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

export const getStartAndStopPoints = async (type: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${type}s/location/start-stop`;
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
}

export const getStocKDataFromPeaCode = async (peaCode: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/stocks/pea-code/${peaCode}`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  try {
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error: any) {
    return null;
  }
}