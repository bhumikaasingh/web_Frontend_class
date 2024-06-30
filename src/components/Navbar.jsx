import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    //get user data
    const user = JSON.parse(localStorage.getItem('user'));

    // logout function
    const handelLogout = () => {
        localStorage.clear()
        window.location.href = '/login'
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Glam craft</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Products</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            {
                                user ? (
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Welcome {user.firstName}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">

                                                <FontAwesomeIcon icon={faUser} className="me-2" />Profile</a></li>
                                            <li><a className="dropdown-item" href="#">Settings</a></li>
                                            <li><button onClick={handelLogout} className="dropdown-item" href="#">Logout</button></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        <Link to={'/register'} className="btn btn-outline-danger me-2" type="submit">Register</Link>
                                        <Link to={'/login'} className="btn btn-outline-success" type="submit">Login</Link>
                                    </>
                                )
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
