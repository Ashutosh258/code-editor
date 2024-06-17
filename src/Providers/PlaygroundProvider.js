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

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(()=>{
    const localdata = localStorage.getItem("data");
    return localdata ? JSON.parse(localdata) : initialData
  });

  const defaultCodes = {
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
  useEffect(() => {
    if(!localStorage.getItem("data")){
      localStorage.setItem("data", JSON.stringify(folders));
    }
  }, []);

  const playgroundFeatures = {
    folders,
    createNewPlayground,
  };
  return (
    <PlaygroundContext.Provider value={playgroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
