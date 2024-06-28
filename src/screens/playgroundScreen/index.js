import { useParams } from "react-router-dom";
import { EditorContainer } from "./EditorContainer";
import "./index.scss";
import { useState } from "react";

export const PlaygroundScreen = () => {

  const [textAreaValue, setTextAreaValue] = useState('Hello👋');

    const handleInputChange = (event) => {
      setTextAreaValue(event.target.value);
    };


  const params = useParams();
  const { fileId, folderId } = params;
  return (
    <div className="playground-container">
      <div className="header-container">
        <img className="logo" src="/logo.png" width={50} height={50} />
      </div>
      <div className="content-container">

        <div className="editor-container">

          <EditorContainer/>

        </div>

        <div className="input-output-container">
             <div className="input-header">
                <b>Input:</b>
                <label htmlFor="input" className="icon-container">
                    <span className="material-icons">cloud_upload</span>
                    <span className="">Import Input</span>
                </label>
                <input type="file" id="input" style={{display: 'none'}} />
             </div>
             <textarea value={textAreaValue} onChange={handleInputChange} />
        </div> 
        <div className="input-output-container">
            <div className="input-header">

            <b>Output:</b>

            <button className="icon-container">
                <span className="material-icons" >cloud_download</span>
                <span>Export Output</span>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};
