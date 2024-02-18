import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import HomePage from "./pages/home/homePage";
import AuthPage from "./pages/auth/AuthPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IntroPages from "./pages/intro/IntroPage";
import ModalPage from "./pages/modal/ModalPage";
import SlideOverPage from "./pages/slideOver/SlideOver";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth/*" element={<AuthPage />} />
                    <Route path="/intro" element={<IntroPages />} />
                    <Route path="modal" element={<ModalPage />} />
                    <Route path="/slide-over" element={<SlideOverPage />} />
                </Routes>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
