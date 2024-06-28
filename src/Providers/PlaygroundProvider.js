import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const PlaygroundContext = createContext();

const initialData = [
  {
    id: v4(),
    titles: "DSA",
    files: [
      {
        id: v4(),
        titles: "index",
        code: `cout<<"hello world`,
        language: "cpp",
      },
    ],
  },
  {
    id: v4(),
    titles: "frontend",
    files: [
      {
        id: v4(),
        titles: "test",
        code: `console.log("hello world")`,
        language: "javascript",
      },
    ],
  },
];

export const defaultCodes = {
  cpp: `#include <iostream>
using namespace std;

// This is a basic example on how to use
// the library
int main()
{
  cout << "Hello World";
  return 0;
}
`,
  javascript: `console.log("Hello World")`,

  java: `public class HelloWorld {
  public static void main(String[] args) {
      // Print Hello World to the console
      System.out.println("Hello World");
  }
}
`,
  python: `print("Hello World")`,
  rust: `fn main() {
  println!("Hello World");
}
`,
};


export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(()=>{
    const localdata = localStorage.getItem("data");
    return localdata ? JSON.parse(localdata) : initialData
  });

  
  const createNewPlayground = (newPlayground) => {
    const { filename, folderName, language } = newPlayground;
    const newFolders = [...folders];
    newFolders.push({
      id: v4(),
      titles: folderName,
      files: [
        {
          id: v4(),
          titles: filename,
          code: defaultCodes[language],
          language
        },
      ],
    });
    localStorage.setItem("data", JSON.stringify(newFolders));
    setFolders(newFolders);
  };


  const createNewFolder=(folderName)=>{
    const newFolder ={
      id: v4(),
      titles: folderName,
      files: []
    } 
    const allFolders=[...folders,newFolder]
    localStorage.setItem("data", JSON.stringify(allFolders));
    setFolders(allFolders);
  }


  const deleteFolder =(id)=>{
    const updatedFoldersList= folders.filter((folderItem)=>{
      return folderItem.id!==id;
    })
    localStorage.setItem('data',JSON.stringify(updatedFoldersList));
    setFolders(updatedFoldersList)
  }

  const editFolderTitle=(newFolderName,id)=>{
   const updatedFoldersList= folders.map((folderItem)=>{
      if(folderItem.id===id){
        folderItem.titles=newFolderName
      }
      return folderItem;
    })
    localStorage.setItem('data',JSON.stringify(updatedFoldersList))
    setFolders(updatedFoldersList);
  }

  const editFileTitle =(newFileName,folderId,fileId)=>{
    const copiedFolders=[...folders];
      for(let i=0; i<copiedFolders.length; i++){
        console.log(copiedFolders[i]);
          if(folderId === copiedFolders[i].id){
            const files=copiedFolders[i].files;
            for(let j=0; j<copiedFolders[i].files.length; j++){
              if(files[j].id===fileId){
                files[j].titles=newFileName;
                break;
              }
            }
            break;
          }
      }
      localStorage.setItem('data',JSON.stringify(copiedFolders));
      setFolders(copiedFolders);
  } 

  const deleteFile =(folderId,fileId)=>{
    const copiedFolders=[...folders];

    for(let i=0; i<copiedFolders.length; i++){
      if(copiedFolders[i].id === folderId){
        const files=[...copiedFolders[i].files];
        copiedFolders[i].files=files.filter((file)=>{
          return file.id !==fileId;
        })
        break;
      }
    }
    localStorage.setItem('data',JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  }
  const createPlayground= (folderId,file) =>{
    const copiedFolders=[...folders];
    for(let i=0; i<copiedFolders.length; i++){
      if(copiedFolders[i].id === folderId){
       copiedFolders[i].files.push(file);
       break;
      }
    }
    localStorage.setItem('data', JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  }


  useEffect(() => {
    if(!localStorage.getItem("data")){
      localStorage.setItem("data", JSON.stringify(folders));
    }
  }, []);

  const playgroundFeatures = {
    folders,
    createNewPlayground,
    createNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createPlayground,
  };
  return (
    <PlaygroundContext.Provider value={playgroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
