import { useParams } from "react-router-dom";
import { EditorContainer } from "./EditorContainer";
import "./index.scss";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { makeSubmission } from "./service";

export const PlaygroundScreen = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleOutputChange = (event) => {
    setOutput(event.target.value);
  };

  const params = useParams();
  const { fileId, folderId } = params;

  const importInput = (e) => {
    const file = e.target.files[0];
    const FileType = file.type.includes("text");
    if (!FileType) {
      toast.error("Please upload a valid text file!");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (value) => {
      const fileContent = value.target.result;
      setInput(fileContent);
      toast.success("File imported successfully!");
    };
  };
  const exportOutput = () => {
    const outputValue = output.trim();
    if (!outputValue) {
      toast.error("No output to export!");
      return;
    }
    const blob = new Blob([outputValue], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.txt";
    link.click();
    toast.success("Output downloaded");
  };

  const callback = ({ apiStatus, data, message }) => {
    if(apiStatus==='loading'){
      setShowLoader(true);
    }else if(apiStatus==='error'){
      setShowLoader(false);  
      setOutput("something went wrong")

    }else{
      setShowLoader(false);
        if(data.status.id===3){
          setOutput(atob(data.stdout))
        }else{
          setOutput(atob(data.stderr))
        }
    }
  };
  const runCode=useCallback(({code,language})=>{
    // console.log(code,language,input);
    makeSubmission({code, language, callback,stdin:input})
  },[input])

  return (
    <div className="playground-container">
      <div className="header-container">
        <img className="logo" src="/logo.png" width={50} height={50} />
      </div>
      <div className="content-container">
        <div className="editor-container">
          <EditorContainer
            fileId={fileId}
            folderId={folderId}
            runCode={runCode}
          />
        </div>

        <div className="input-output-container">
          <div className="input-header">
            <b>Input:</b>
            <label htmlFor="input" className="icon-container">
              <span className="material-icons">cloud_upload</span>
              <span className="">Import Input</span>
            </label>
            <input
              type="file"
              id="input"
              style={{ display: "none" }}
              onChange={importInput}
            />
          </div>
          <textarea value={input} onChange={handleInputChange} />
        </div>
        <div className="input-output-container">
          <div className="input-header">
            <b>Output:</b>

            <button className="icon-container" onClick={exportOutput}>
              <span className="material-icons">cloud_download</span>
              <span>Export Output</span>
            </button>
          </div>
          <textarea readOnly value={output} onChange={handleOutputChange} />
        </div>
      </div>
      {showLoader && (
        <div className="fullpage-loader">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};
