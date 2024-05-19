import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { getFiles } from "../features/files/fileSlice";
import { reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFile } from "../features/files/fileSlice";
import Loading from "./Loading";

const FileForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [fileList,setFileList] = useState([])

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
      dispatch(getFiles()).then(result => {
        setFileList(result.payload)
        // console.log(result.payload);
    }).catch(error => {
        console.log(error);
    });
    }
    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch,file,fileList]);

  const uploadFile = async (type) => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }
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
          console.log(percentCompleted);
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
    e.preventDefault();
    console.log("dgojs");
    try {
      setLoading(true);
      const fileUrl = await uploadFile("file");
      const fileName=file.name
      console.log(fileUrl,fileName);
      dispatch(createFile({ fileUrl,fileName }));

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
        <h1 className="text-xl">Files</h1>
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          onChange={(e) => setFile((prev) => e.target.files[0])}
        />
        {!file && (
          <button className="" onClick={onChooseFile}>
            Browse files
          </button>
        )}
        {file && (
          <>
            <p>{file?.name}</p>
            {uploadStatus === "select" ? (
              <button onClick={clearFileInput}>
                <span class="material-symbols-outlined close-icon">X</span>
              </button>
            ) : (
              <div className="check-circle">
                {uploadStatus === "uploading" ? (
                  `${progress}%`
                ) : uploadStatus === "done" ? (
                  <span
                    class="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    check
                  </span>
                ) : null}
              </div>
            )}
            <button className="upload-btn" onClick={handleSubmit}>
              {uploadStatus === "select" || uploadStatus === "uploading"
                ? "Upload"
                : "Done"}
            </button>
            <br />
          </>
        )}
      </div>
      {fileList.length > 0 ? (
    <div className="flex gap-4">{fileList.map((file) => (
        <a target="_blank" href={file.fileUrl}><div className="border " key={file.id}>{file.fileName?file.fileName:"Filedfdhddhdhdhdhd"}</div></a>
    ))}</div>
) : (
    "No Files"
)}

    </>
  );
};

export default FileForm;
