/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getAuthToken = async () => {
  const res = await axios.get(
    "http://localhost:3001/apifex/api/v1/anonymous/upload-token",
    {
      headers: {
        "accept-language":
          "en,vi-VN;q=0.9,vi;q=0.8,fr-FR;q=0.7,fr;q=0.6,en-US;q=0.5",
        priority: "u=1, i",
      },
    }
  );
  return res.data.token;
};

export const getUriPostFile = async (
  authToken: string,
  size: number,
  nameFile: string
) => {
  const res = await axios.post(
    "http://localhost:3001/apifex/api/v1/anonymous/file",
    {
      directory_id: null,
      size: size,
      name: nameFile,
    },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    }
  );
  return res.data;
};
export const postFile = async (
  authToken: string,
  size: number,
  nameFile: string,
  id: string
) => {
  const res = await axios.post(
    `http://localhost:3001/fs24/upload/${id}`,
    {
      directory_id: null,
      size,
      name: nameFile,
    },
    {
      headers: {
        "fsp-filename": nameFile,
        "fsp-size": size,
        "accept-language":
          "en,vi-VN;q=0.9,vi;q=0.8,fr-FR;q=0.7,fr;q=0.6,en-US;q=0.5",
        priority: "u=1, i",
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    }
  );
  return res.data;
};

export const postSuccessFile = async (
  authToken: string,
  fileContent: any, // Dữ liệu nhị phân của file
  nameFile: string,
  id: string
) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/fs24/upload/${id}`,
      fileContent, // Gửi dữ liệu file dạng nhị phân
      {
        headers: {
          authorization: `Bearer ${authToken}`,
          "fsp-filename": nameFile,
          "fsp-offset": "0",
          "fsp-version": "1.0.0",
          "Content-Type": "application/offset+octet-stream", // Chú ý chữ "C" viết hoa
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi upload file:", error);
    throw error;
  }
};
