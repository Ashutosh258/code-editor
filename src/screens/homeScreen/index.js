import { RightComponent } from "./rightComponent";
import "./index.scss"
import { Modal } from "../../Providers/modals/Modal";
import { useContext } from "react";
import { ModalContext } from "../../Providers/ModalProvider";

export const HomeScreen = () => {

    const modalFeatures =useContext(ModalContext)
    const openCreatePlaygroundModal= ()=>{
        modalFeatures.openModal("CREATE_PLAYGROUND");
    };
    
    return (
        <div className="home-container">
            <div className="left-container">
                <div className="items-container">
                <img src="logo.png" width={300} height={300}/>
                 <button onClick={openCreatePlaygroundModal}>
                    <span className="material-icons">add</span>
                    <span>Create PlayGround</span>
                    
                 </button>
                </div>
            </div>
            <RightComponent/>
            <Modal/>
        </div>
    );
};
