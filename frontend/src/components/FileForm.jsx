import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import Loading from "./Loading";

const FileForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset", "obw4ebow");

    try {
      let api = `https://api.cloudinary.com/v1_1/dn2oxlhw7/raw/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("dgojs");
    try {
      setLoading(true);
      const fileUrl = await uploadFile("file");
      await axios.post(`/api/files`, {fileUrl});

      setFile(null);

      console.log("File upload success!");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="justify-between flex align-middle items-center">
      <h1 className="text-xl">Files</h1>
      <input
        type="file"
        onChange={(e) => setFile((prev) => e.target.files[0])}
      />
      <button onClick={handleSubmit} type="submit">Upload</button>
      <p className="">
        <CiCirclePlus size={20} />
        {
        loading && <Loading/>
      }
      </p>
    </div>
  );
};

export default FileForm;
