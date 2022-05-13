import upload from "../styles/upload.module.css";
import { useState } from "react"
import axios from "axios";

export default function Upload() {

  const [filename, setFilename] = useState("")

  const handleFileChange = (evt) => {
    console.log(evt);
    const file = evt.target.files[0]
    setFilename(file.name)


    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", "alex")
    axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      console.log("okk...")
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
        <p className=""> {filename}</p>
        <label htmlFor="file" className={upload.label}>
          上传文件
          <input
            id="file"
            type="file"
            hidden={true}
            onChange={handleFileChange}
          />
        </label>

    </div>
  );
}
