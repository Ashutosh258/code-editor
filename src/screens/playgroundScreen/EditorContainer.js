import "./EditorContainer.scss";
import { Editor } from "@monaco-editor/react";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";

const editorOptions = {
  fontSize: 18,
  wordWrap: "on",
};

const fileExtensionMapping = {
  cpp: "cpp",
  java: "java",
  javascript: "js",
  python: "py",
};

export const EditorContainer = ({ fileId, folderId, runCode }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode } =
    useContext(PlaygroundContext);

  const [code, setCode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });
  const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, setTheme] = useState("vs-dark");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const codeRef = useRef(code);

  const onChangeCode = (newCode) => {
    codeRef.current = newCode;
    setCode(newCode);
  };

  const onImportCode = (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const isValidFileType =
      Object.keys(fileExtensionMapping).includes(fileExtension);

    if (isValidFileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (value) => {
        const fileContent = value.target.result;
        setCode(fileContent);
        toast.success("File imported successfully!");
        codeRef.current = fileContent;
      };
    } else {
      toast.error("Please upload a valid program file!");
    }
  };
  const onChangeLanguage = (e) => {
    updateLanguage(fileId, folderId, e.target.value);
    setCode(getDefaultCode(fileId, folderId));
    codeRef.current = getDefaultCode(fileId, folderId);
    setLanguage(e.target.value);
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.value);
  };
  const onSaveCode = () => {
    saveCode(code, fileId, folderId);
    toast.success("Code saved successfully!");
  };
  const exportCode = () => {
    const fileContent = codeRef.current?.trim();

    if (!fileContent) {
      toast.error("No code to export!");
    }
    //Blob helps to create instant file in the memory

    const codeBlob = new Blob([fileContent], { type: "text/plain" });

    // downloadable link with blob data

    const downloadUrl = URL.createObjectURL(codeBlob);

    // creating a clickable link

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `code.${fileExtensionMapping[language]}`;
    link.click();
  };

  const fullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onRunCode = () => {
    runCode({code:codeRef.current, language});
  };

  return (
    <div
      className="root-editor-container"
      style={isFullScreen ? styles.fullScreen : {}}
    >
      <div className="editor-header">
        <div className="editor-left-container">
          {/* <b className="title">{"title of the cards"}</b> */}
          {/* <span className="material-icons">edit</span> */}
          <button onClick={onSaveCode} >Save Code</button>
        </div>
        <div className="editor-right-container">
          <select onChange={onChangeLanguage} value={language}>
            <option value="cpp">cpp</option>
            <option value="java">java</option>
            <option value="javascript">javascript</option>
            <option value="python">python</option>
          </select>

          <select onChange={onChangeTheme} value={theme}>
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
          </select>
        </div>
      </div>
      <div className="editor-body">
        <Editor
          language={language}
          options={editorOptions}
          theme={theme}
          onChange={onChangeCode}
          value={code}
        />
      </div>
      <div className="editor-footer">
        <button onClick={fullScreen} className="btn">
          <span className="material-icons">fullscreen</span>
          <span>{isFullScreen ? "minimize" : "Full Screen"}</span>
        </button>
        <label htmlFor="import-code" className="btn">
          <span className="material-icons">cloud_download</span>
          <span>Import Code</span>
        </label>
        <input
          type="file"
          id="import-code"
          style={{ display: "none" }}
          onChange={onImportCode}
        />
        <button className="btn" onClick={exportCode}>
          <span className="material-icons">cloud_upload</span>
          <span>Export Code</span>
        </button>
        <button onClick={onRunCode} className="btn-1">
          <span className="material-icons">play_arrow</span>
          <span>Run Code</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  fullScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
  },
};
