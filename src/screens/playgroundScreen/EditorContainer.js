import "./EditorContainer.scss"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
import toast from "react-hot-toast"


const editorOptions={
    fontSize:18,
    wordWrap:'on',
}

const notify = () => toast('Here is your toast.');
export const EditorContainer =()=>{

      
    const [code,setCode]=useState("some Value for editor")

    const onChangeCode =(newCode)=>{

    }
    const onUploadCode =(event)=>{
        const file = event.target.files[0];
        const fileType = file.type.includes("text")
        if(fileType){
            
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (value)=>{
                const fileContent = value.target.result;
                setCode(fileContent)
                console.log(fileContent);
            }
            

        }
        else{
            toast.error("Please upload a program file!")
        }
    }

    return (
        <div className="root-editor-container">
            <div className="editor-header">
                <div className="editor-left-container">
                    <b className="title">{"title of the cards"}</b>
                    <span className="material-icons">edit</span>
                     <button>Save Code</button>
                </div>
                <div className="editor-right-container">
                    <select>
                        <option value="cpp">cpp</option>
                        <option value="java">java</option>
                        <option value="javascript">javascript</option>
                        <option value="python">python</option>
                    </select>
                    <select>
                        <option value="vs-light">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                <Editor 
                    language={"python"}
                    options={editorOptions}
                    theme={"vs-dark"}
                    value={code}
                />
            </div>
            <div className="editor-footer">
                <button className="btn">
                    <span className="material-icons">fullscreen</span>
                    <span>Full Screen</span>
                </button>
                <label htmlFor="import-code" className="btn">
                    <span className="material-icons">cloud_upload</span>
                    <span>Import Code</span>
                </label>
                <input type="file" id="import-code" style={{display:'none'}} onChange={onUploadCode} /> 
                <button className="btn">
                    <span className="material-icons">cloud_download</span>
                    <span>Export Code</span>
                </button>
                <button className="btn-1" >
                    <span className="material-icons">play_arrow</span>
                    <span>Run Code</span>
                </button>
                   
            </div>
        </div>
    )
}