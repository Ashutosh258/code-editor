import { useContext } from "react";
import "./index.scss";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { ModalContext, modalConstants } from "../../../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderTitle, cards, folderId }) => {
  const { deleteFolder, deleteFile } = useContext(PlaygroundContext);
  const { openModal, setModalPayload } = useContext(ModalContext);
  const navigate = useNavigate();

  const onDeleteFolder = () => {
    deleteFolder(folderId);
  };
  const onEditFolderTitle = () => {
    setModalPayload(folderId);
    openModal(modalConstants.UPDATE_FOLDER_TITLE);
  };
  const openCreateCardModal = (e) => {
    e.stopPropagation();
    setModalPayload(folderId);
    openModal(modalConstants.CREATE_CARD);
  };
  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-items">
          <span className="material-icons" style={{ color: "#FFCA29" }}>
            folder
          </span>
          <span>{folderTitle}</span>
        </div>
        <div className="folder-header-items">
          <span onClick={onDeleteFolder} className="material-icons">
            delete
          </span>
          <span onClick={onEditFolderTitle} className="material-icons">
            edit
          </span>
          <button onClick={openCreateCardModal}>
            <span className="material-icons">add</span>
            <span>New Playground</span>
          </button>
        </div>
      </div>
      <div className="cards-container">
        {cards?.map((files, index) => {
          const onEditFile = (e) => {
            e.stopPropagation();
            setModalPayload({ fileId: files.id, folderId: folderId });
            openModal(modalConstants.UPDATE_FILE_TITLE);
          };
          const onDeleteFile = (e) => {
            //deleteFile
            e.stopPropagation();
            deleteFile(folderId, files.id);
          };


          const navigateToPlaygroundScreen = () => {
            //TODO navigate to playground screen
            navigate(`/playground/${files.id}/${folderId}`);
          };

          return (
            <div
              onClick={navigateToPlaygroundScreen}
              className="cards"
              key={index}
            >
              <img src="logo.png" alt="logo" />
              <div className="title-container">
                <span>{files?.titles}</span>
                <span>Language: {files?.language}</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <span onClick={onDeleteFile} className="material-icons">
                  delete
                </span>
                <span onClick={onEditFile} className="material-icons">
                  edit
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RightComponent = () => {
  const { folders } = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);

  const openCreateNewFolderModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_FOLDER);
  };

  return (
    <div className="right-container">
      <div className="header">
        <div className="title">
          <span>My </span>Playground
        </div>
        <button onClick={openCreateNewFolderModal} className="add-folder">
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>
      {folders?.map((folder, index) => (
        <Folder
          key={index}
          folderTitle={folder?.titles}
          cards={folder?.files}
          folderId={folder.id}
        />
      ))}
    </div>
  );
};
