import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import HomePage from "./pages/home/homePage";
import AuthPage from "./pages/auth/AuthPage";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/*" element={<AuthPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
