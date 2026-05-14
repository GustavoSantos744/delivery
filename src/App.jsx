import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Cardapio from "./pages/cardapio/cardapio"; 
import Navbar from "./_components/Navbar/navbar";
import CampoBusca from "./_components/Search/search";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, 
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false, 
    },
  },
});

export default function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:urlacesso"
            element={
              <>
                <Navbar />
                <CampoBusca />
                <Cardapio />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}