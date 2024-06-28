

import { useContext } from "react"
import { ModalContext } from "../ModalProvider"; 
import { PlaygroundContext } from "../PlaygroundProvider";
import "./CreateFolderModal.scss"
import "./CreatePlaygroundModal.scss"

export const CreateFolderModal = ()=>{

    const modalFeatures=useContext(ModalContext);
    const {createNewFolder} =useContext(PlaygroundContext)

    const closeModal=()=>{
         modalFeatures.closeModal({
            isOpen:false
         })
    }
    const onSubmitModal=(e)=>{
        e.preventDefault();
        const folderName=e.target.folderName.value;
        createNewFolder(folderName);
        closeModal();
    } 


    return (
        <div className="modal-container">
          <form onSubmit={onSubmitModal} className="modal-body">
            <span onClick={closeModal} className="material-icons  close">close</span>
            <h1>Create New Folder</h1>
            <div style={createFolderStyles.inputContainer}>
                <input style={createFolderStyles.input} name="folderName" placeholder="Enter Folder Name"/>
                <button style={createFolderStyles.btn} type="submit">Create Folder</button>
            </div>
            
          </form>
        </div>
    ) 
}

export const createFolderStyles={
    inputContainer:{
        display:"flex",
        gap:10   
    },
    input:{
        flexgrow:1,
        padding:10
    },
    btn:{
        backgroundColor:'#241F21',
        border:"none",
        borderRadius:5,
        padding:'0px 10px',
        color:'white',
        cursor:'pointer'
    }
}
    
