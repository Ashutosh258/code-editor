
import { useContext } from "react"
import "./createPlaygroundModal.scss"
import { ModalContext } from "../ModalProvider"
import {createFolderStyles} from "./CreateFolderModal"
import { PlaygroundContext } from "../PlaygroundProvider"

export const UpdateFileTitleModal=()=>{

    const {closeModal,modalPayload}=useContext(ModalContext);
    const {editFileTitle}=useContext(PlaygroundContext)

    const onSubmitModal =(e)=>{
        e.preventDefault();
        const fileName=e.target.fileName.value;
        console.log(fileName,modalPayload.folderId,modalPayload.fileId);
        editFileTitle(fileName,modalPayload.folderId,modalPayload.fileId);
        closeModal();   

    }

    return <div className="modal-container">
             <form onSubmit={onSubmitModal} className="modal-body">
            <span onClick={closeModal} className="material-icons close ">close</span>
            <h1>Update Card Title</h1>
            <div style={createFolderStyles.inputContainer}>
            <input required style={createFolderStyles.input} name="fileName" placeholder="Enter File Name"/>
            <button style={createFolderStyles.btn} type="submit">Update Folder </button>
            </div>
        </form>
    </div>
}