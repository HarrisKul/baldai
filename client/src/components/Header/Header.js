import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import axios from 'axios'
import './Header.css'

const Header = () => {
    const { userInfo, setUserInfo, setAlert } = useContext(MainContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('/api/users/logout/')
        .then(resp => {
            setUserInfo({})
            setAlert({
                message: resp.data,
                status: 'success'
            })

            navigate('/')
        })
    }

    return (
        <div className="container">
            <div className="header">
            <Link to="/" className="">
    
            </Link>
        
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">Main</Link>
                </li>
                <li className="nav-item">
                    <Link to="/posts" className="nav-link" aria-current="page">Our Products</Link>
                </li>
                {userInfo.role === 0 && 
                <>
                         <li className="nav-item">
                         <Link to="/posts" className="nav-link" aria-current="page">Your Orders</Link>
                     </li>
                     <button onClick={handleLogout} className="nav-item">Log out</button>
                </>
                    }
             
                {userInfo.role === 1 &&
                  <li className='nav-item'>
                 <Link to="/admin" className="nav-link" >Admin</Link>
                <ul>
                     <li>
                <Link to="/admin/posts/new/" className="nav-link" >New Product</Link>
                     </li>
                 <li>
                <Link to="/admin/workers" className="nav-link"> Orders</Link>
                    </li>
                    <button onClick={handleLogout} className="nav-item">Log out</button>
                    </ul>
                </li>
                    }
                </ul>

            <div className="nav nav-pills">
             {userInfo.id ? 
            
             <>
             </>
                        
                        :
                <>
            <ul className='nav nav-pills'>
          <li className='nav-item'> <Link to="/register" className="nav-link" aria-current="page">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page">Login</Link>
                </li>
                </ul>
                 </>
                    }
            </div>
        </div>
    </div>
    
    )
}


export default Header


// const Header = (props) => {
//     const loggedIn = props.loggedIn

// {loggedIn ?  (

//     <>
//              <li className="nav-item">
//     <Link to="/new-post" className="nav-link" aria-current="page">Add product</Link>
// </li>
// <li className="nav-item">
//     <Link to='/logout' className="nav-link"
//      aria-current="page">Logout</Link>
// </li>

//     </>

// ) : (
//  <>
//  <li className="nav-item">
//      <Link to="/register" className="nav-link" aria-current="page">Register</Link>
//  </li>
// { <li className="nav-item">
//     <Link to="/login" className="nav-link" aria-current="page">Login</Link>
// </li> }
//  </>
//    )}