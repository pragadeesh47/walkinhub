
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// import './App.css'
// import JobForm from './components/jobform/JobForm'
// import WalkIns from './pages/WalkIns'
// import JobDetail from './components/walkin/JobDetail'
// import Header from './components/header/Header'
// import Signup from './components/authentication/Signup'
// import Login from './components/authentication/Login'
// import { ToastContainer } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

// function App() {


//   return (
//     <>
//       <BrowserRouter>
//       <Header/>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000} // Toast will automatically close after 5 seconds
//         hideProgressBar
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <Routes>
//       <Route path = '/signup' element ={<Signup/>}/>
//         <Route path = '/login' element ={<Login/>}/>
//         <Route path='/' element ={<WalkIns/>}/>
//         <Route path='/post-walkin' element ={<JobForm/>}/>
//         <Route path='/job/:name/:id' element ={<JobDetail/>}/>
//       </Routes> 
//       </BrowserRouter>
//     </>
//   )
// }

// export default App












import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import JobForm from './components/jobform/JobForm'
import WalkIns from './pages/WalkIns'
import JobDetail from './components/walkin/JobDetail'
import Header from './components/header/Header'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './utils/AuthContext'
import ProtectedRoute from './utils/ProtectedRoute'
import NotFound from './components/not-found/NotFound'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop />
        <Routes>
          <Route path='/' element={<WalkIns />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/post-walkin'
            element={
              <ProtectedRoute>
                <JobForm />
              </ProtectedRoute>
            }
          />
          <Route path='/job/:name/:id' element={<JobDetail />} />
          {/* <Route Component={<NotFound/>}/> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
