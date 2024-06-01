import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { getFiles } from "../features/files/fileSlice";
import { reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFile } from "../features/files/fileSlice";
import Loading from "./Loading";
import { MdOutlineCancel } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const FileForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [fileList, setFileList] = useState([]);

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { files, isLoading, isError, message } = useSelector(
    (state) => state.files
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      navigate("/login");
    }
    if (user) {
      dispatch(getFiles())
        .then((result) => {
          setFileList(result.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, file]);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "obw4ebow");

    try {
      setUploadStatus("uploading");
      let api = `https://api.cloudinary.com/v1_1/dn2oxlhw7/raw/upload`;
      const res = await axios.post(api, data, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // console.log(percentCompleted);
          setProgress(percentCompleted);
        },
      });

      const { secure_url } = res.data;
      setUploadStatus("done");
      return secure_url;
    } catch (error) {
      console.error(error);
      setUploadStatus("select");
    }
  };

  const handleSubmit = async (e) => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      const fileUrl = await uploadFile("file");
      const fileName = file.name;
      // console.log(fileUrl, fileName);
      dispatch(createFile({ fileUrl, fileName }));

      setFile(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setFile("");
    setProgress(0);
    setUploadStatus("select");
  };

  return (
    <>
      <div className="justify-between flex align-middle items-center">
        <h1 className="text-xl font-semibold">Files</h1>
        <div className="flex align-middle items-center gap-4">
          <input
            className="hidden"
            ref={inputRef}
            type="file"
            onChange={(e) => setFile((prev) => e.target.files[0])}
          />
          {!file && (
            <button
              className="border px-4 py-1 rounded-lg bg-blue-500 text-white"
              onClick={onChooseFile}
            >
              Browse files
            </button>
          )}
          {file && (
            <div className="flex">
              <div className="flex items-center gap-2 mx-4 px-2 rounded-md bg-pink-200">
                <p>{file?.name}</p>
                {uploadStatus === "select" ? (
                  <button onClick={clearFileInput}>
                    <span className="py-4">
                      <MdOutlineCancel />
                    </span>
                  </button>
                ) : (
                  <div>
                    {uploadStatus === "uploading" ? (
                      `${progress}%`
                    ) : uploadStatus === "done" ? (
                      <span>
                        <FaRegCheckCircle />
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
              <button
                className="border px-4 py-1 rounded-lg bg-pink-400 text-white"
                onClick={handleSubmit}
              >
                {uploadStatus === "select" || uploadStatus === "uploading"
                  ? "Upload"
                  : "Done"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4"></div>
      {fileList.length > 0 ? (
        <div className="flex gap-4 whitespace-nowrap overflow-y-auto mb-4">
          {fileList.slice().reverse().map((file) => (
            <a target="_blank" href={file.fileUrl}>
              <span
                className="flex items-center border rounded-md px-2 bg-slate-200 gap-2"
                key={file.id}
              >
                <FaFileAlt />
                {file.fileName ? file.fileName : "fastlog"}
              </span>
            </a>
          ))}
        </div>
      ) : (
        "No Files"
      )}
    </>
  );
};

export default FileForm;