import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen/index.js";
import { PlaygroundScreen } from "./screens/playgroundScreen/index.js";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider.js";
import { ModalProvider } from "./Providers/ModalProvider.js";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/playground/:fileId/:folderId" element={<PlaygroundScreen />} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
