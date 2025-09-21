import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from "./layout/main.layout";
import RootLayout from "./layout/root-latyout";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from './pages/home.page';
import SignInPage from './pages/sign-in.page';
import SignUpPage  from './pages/sign-up.page';
import CreateForm from './pages/create-Form.page';
import Dashboard from './pages/Dashbord.page';
import  Submition  from './pages/submition.page';
import PreviewPage from './pages/preview.page';
import ProtectedLayout from "./layout/protected.layout";
import AdminProtectedLayout from "./layout/admin-protected-layout";




import { store } from "./lib/api/store";
import { Provider } from "react-redux";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

import { ClerkProvider } from "@clerk/clerk-react";


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>

     <BrowserRouter>
     <Routes>
      
 <Route element={<RootLayout />}>
  <Route element={<MainLayout />}>

  <Route path="/" element={<Dashboard/>} />

      <Route element={<ProtectedLayout />}>

        <Route path="/Form" element={<Homepage/>} />
         <Route path="/Form/create" element={<CreateForm/>} />
          <Route path="/preview/:id" element={<PreviewPage />} />

                <Route element={<AdminProtectedLayout/>}>

          <Route path="/Form/submition" element={<Submition />} />


         </Route>
          
</Route>
        

</Route>

<Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

</Route>
     

     </Routes>
   
  </BrowserRouter>
      </Provider>
 </ClerkProvider>
  </StrictMode>,
)
