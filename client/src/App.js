import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header/Header';
import Main from './pages/Main';
import Posts from './pages/Posts';
import NewPost from './pages/admin/NewPost/NewPost';
import Register from './pages/Register';
import Login from './pages/Login';
import Alert from './components/Alert/Alert';
import MainContext from './context/MainContext';
import axios from 'axios';

const App = () => {
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
    .then(resp => {
      setUserInfo(resp.data)
    })
  }, [])


  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin keliai */}
            {userInfo.role === 1 &&
              <Route path="admin">
                <Route path="posts/new" element={<NewPost />} />
              </Route>
            }
            {/* Vieši keliai */}
            {/* <Route path="/" element={<PublicSaloons />} />
            <Route path="workers" element={<PublicWorkers />} />
            {userInfo.id &&
              <>
                <Route path="new-order/:saloonId" element={<PublicNewOrder />} />
                <Route path="orders" element={<PublicOrders />} />
              </>
            } */}
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
    
  )
}

export default App;



{/* <BrowserRouter>
<Header />
<Routes>
  <Route path="/" element={<Main />} />
  <Route path="/posts" element={<Posts />} />
  <Route path="/new-post" element={<NewPost />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
</Routes>
</BrowserRouter> */}