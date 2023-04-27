import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "components/toast/ToastProvider";
import styled from "styled-components";
import RecipesPage from "pages/recipes-page";

export const AppContainer = styled.div(({ theme: { fonts, media } }) => ({
  fontFamily: `normal, ${fonts.main}`,
  maxWidth: "90%",
  margin: "auto",
  [media.tablet]: {
    maxWidth: "100%",
    minHeight: "100vh",
  },
}));

function App() {
  return (
    <ToastProvider>
      <AppContainer>
        <Routes>
          <Route path="/" element={<RecipesPage />} />
        </Routes>
      </AppContainer>
    </ToastProvider>
  );
}

export default App;
