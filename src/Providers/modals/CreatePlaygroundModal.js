import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

export const CreatePlaygroundModal = () => {
  const modalFeatures = useContext(ModalContext);
  const playgroundFeatures = useContext(PlaygroundContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    const filename = e.target.filename.value;
    const language = e.target.language.value;
    playgroundFeatures.createNewPlayground({ folderName, filename, language });

    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">
          close
        </span>
        <h1>Create New Playground</h1>
        <div className="item">
          <p>Enter folder Name</p>
          <input name="folderName" required />
        </div>
        <div className="item">
          <p>Enter card name</p>
          <input name="filename" required />
        </div>
        <div className="item">
          <select name="language" required>
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
            <option value="python">python</option>
          </select>
          <button type="submit">Create Playground</button>
        </div>
      </form>
    </div>
  );
};
