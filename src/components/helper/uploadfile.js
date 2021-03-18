import axios from "axios";

class FileUploadService {
    upload(file, onUploadProgress) {
      let formData = new FormData();
  
      formData.append("file", file);
  
      return axios.post("http://localhost:3000/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    }
  
    getFiles() {
      return axios.get("http://localhost:3000/files");
    }
  }
  
  export default new FileUploadService();