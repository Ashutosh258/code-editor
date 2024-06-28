import "./CreatePlaygroundModal.scss"
import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext} from "../PlaygroundProvider";
import { createFolderStyles } from "./CreateFolderModal";


export const UpdateFolderTItleModal =()=>{

    const {editFolderTitle}=useContext(PlaygroundContext) 
    const {closeModal,modalPayload} = useContext(ModalContext);
   

      const onSubmitModal =(e)=>{
         e.preventDefault();
         const folderName=e.target.folderName.value;
         editFolderTitle(folderName,modalPayload); 
         closeModal();  

      }


    return <div className="modal-container">
        <form onSubmit={onSubmitModal} className="modal-body">
            <span onClick={closeModal} className="material-icons close ">close</span>
            <h1>Create New Playground</h1>
            <div style={createFolderStyles.inputContainer}>
            <input required style={createFolderStyles.input} name="folderName" placeholder="Enter Folder Name"/>
            <button style={createFolderStyles.btn} type="submit">Create Folder</button>
            </div>
        </form>
    </div>
}