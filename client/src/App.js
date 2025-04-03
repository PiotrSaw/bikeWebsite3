import { Route, Routes } from "react-router-dom"
import Signup from './components/Signup'
import Login from "./components/Login"
import Home from "./components/Home"
import ContactPage from "./components/Contact"
import Form from "./components/Form"
import SuccessPage from "./components/SuccessPage"
import Browser from "./components/Browser"
import EditForm from "./components/EditForm"
import RegisterSuccess from "./components/RegisterSuccess"
import Error404 from "./components/Error404"

function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="/rezerwacje" element={<Form />} />
      <Route path="/sukces" element={<SuccessPage />} />
      <Route path="/przegladarka" element={<Browser />} />
      <Route path="/edytuj/:id" element={<EditForm />} />
      <Route path="/pomyslna-rejestracja" element={<RegisterSuccess />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}
export default App