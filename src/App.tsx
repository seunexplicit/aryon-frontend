import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersPage } from "./pages/UsersPage";
import { BrowserRouter, Route, Routes } from "react-router";
import { PostsPage } from "./pages/PostsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="container mx-auto p-10 font-sans">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/users/:userId/posts" element={<PostsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App
