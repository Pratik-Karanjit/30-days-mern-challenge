import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './ProjectComponents/HomePage'
import ContactPage from './ProjectComponents/ContactPage'
import AboutUs from './ProjectComponents/AboutUs'
import ErrorPage from './ProjectComponents/ErrorPage'
import CreateAccount from './ProjectComponents/CreateAccount'
import RegistrationSuccess from './ProjectComponents/RegistrationSuccess'
import ReadAllData from './ProjectComponents/RealAllData'
import CreateLogin from './ProjectComponents/CreateLogin'
import VerifyEmailPage from './ProjectComponents/VerifyEmail'
import MyProfile from './ProjectComponents/MyProfile'
import NavBar from './ProjectComponents/NavBar'
import UpdateProfile from './ProjectComponents/UpdateProfile'
import UpdateUserPassword from './ProjectComponents/UpdateUserPassword'
import AdminPanel from './ProjectComponents/AdminPanel'
import ForgotPassword from './ProjectComponents/ForgotPassword'
import ForgotPassVerification from './ProjectComponents/ForgotPasswordVerification'
import ForgotPasswordReset from './ProjectComponents/ForgotResetPassword'
import MyComponentPage from './pages/MyComponent'
const WowProject = () => {
  return (
    
    <div>

    <Routes>
        {/* Nested Routing  */}

        <Route path = "/" element = {<div> <NavBar></NavBar><Outlet></Outlet></div>}>
        <Route index element = {<HomePage></HomePage>}></Route>
        <Route path = "contact" element = {<ContactPage></ContactPage>}></Route>
        <Route path = "about" element = {<AboutUs></AboutUs>}></Route>
        <Route path = "create" element = {<CreateAccount></CreateAccount>}></Route>
        <Route path = "login" element = {<CreateLogin></CreateLogin>}></Route>
        <Route path="my-component" element={<MyComponentPage></MyComponentPage>}></Route> 
        
        <Route path = "my-profile" element = {<MyProfile></MyProfile>}></Route>
        <Route path = "update-my-profile" element = {<UpdateProfile></UpdateProfile>}></Route>
        <Route path ="security" element = {<UpdateUserPassword></UpdateUserPassword>}></Route>
        <Route path="/admin/panel" element = {<AdminPanel></AdminPanel>}></Route>
        <Route path="/admin/panel" element = {<AdminPanel></AdminPanel>}></Route>
        <Route path = "forgot-password" element = {<ForgotPassword></ForgotPassword>}></Route>

              <Route path = "forgot-password-verification" element = {<ForgotPassVerification></ForgotPassVerification>}></Route>
              <Route path="forgot-password-reset" element={<ForgotPasswordReset></ForgotPasswordReset>}querystring/>

        <Route path = "read" element = {<ReadAllData></ReadAllData>}></Route>
        <Route path = "registration-success" element = {<RegistrationSuccess></RegistrationSuccess>}></Route>
        <Route path = "verify" element = {<VerifyEmailPage></VerifyEmailPage>}></Route>
        <Route path="verify-email" element={<VerifyEmailPage />}querystring/>
        



        {/* For 404 Error Page */}
        <Route path = ":id" element = {<ErrorPage></ErrorPage>}></Route>

            </Route>

    </Routes>

    </div>
  )
}

export default WowProject