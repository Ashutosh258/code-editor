import "./CreatePlaygroundModal.scss"
import { v4 } from "uuid";
import {ModalContext} from"../ModalProvider"
import { PlaygroundContext, defaultCodes } from "../PlaygroundProvider";
import { useContext } from "react";

export const CreatecardModal  =()=>{
    const {closeModal,modalPayload}=useContext(ModalContext);
    const {createPlayground}=useContext(PlaygroundContext);

    const onSubmitModal =(e)=>{
        e.preventDefault();
        const filename=e.target.filename.value;
        const language=e.target.language.value;
        const file ={
            id:v4(),
            titles:filename,
            language:language,
            code: defaultCodes[language]
        }
        createPlayground(modalPayload,file);
        closeModal();
    }

    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick={closeModal} className="material-icons close" >close</span>
            <h1>Create New Playground</h1>
            <div className="item">
                <input name="filename" placeholder="Enter card title" required/>
            </div>
            <div className="item">
                <select name="language" required>
                    <option value="cpp">CPP</option>
                    <option value="python">Java</option>
                    <option value="javascript">Python</option>
                    <option value="python">JavaScript</option>
                </select>
                <button type="submit">
                    Create Playground
                </button>
            </div>
        </form>
    </div>
}