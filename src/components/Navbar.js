import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import img1 from '../img/shareit_logo_2021.png';
import Firebase from "../firebase/Firebase";

const auth = Firebase.instance().auth;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: props.user,
            click: false 
        }
    }

    async logout() {
        try {
        await auth.signOut();
        } catch (err) {
        alert(err);
        }
    }

    myAccount(e) {
        e.preventDefault();
        const url = "/profile/" + this.props.user.$.W; 
        this.props.history.push(url);
    } 

    handleClick() {
        this.setState({
            click: !this.state.click
        })
    }
    closeMobileMenu() {
        this.setState({
            click: false 
        })
    }
    
    render() {
        const { user } = this.props;
        const url = '/profile/';

        return (
            <div style={{width: '90%', margin: 'auto'}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand"><img src={img1} alt="Logo" style={{width: '120px', position: 'relative', top: '8px'}} className="mb-3"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/main'>Employees</Link>
                                    </li>
                                :
                                    null
                            }
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to={url + this.props.user.$.W}>My Account</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={()=>this.logout()}>Log Out</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                !user ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Log In</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                !user ?
                                    <li className="nav-item">
                                <       Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                :
                                    null
                            }       
                        </ul>
                    </div>
                </nav>
                {/* <nav className="navbar mb-3" style={{width: '90%', margin: 'auto'}}>
                    <div className="navbar-container">
                        <Link to="/" className="navbar-brand"><img src={img1} alt="Logo" style={{width: '120px', position: 'relative', top: '8px'}} className="mb-3"/></Link>
                        <div className='menu-icon' onClick={this.handleClick}>
                            <i className={this.state.click ? 'fas fa-times' : 'fas fa-bars'} />
                        </div>
                        <ul className={this.state.click ? 'nav-menu active' : 'nav-menu'}>
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-links" to='/main'>Employees</Link>
                                    </li>
                                :
                                    null
                            }
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-links" to={url + this.props.user.$.W}>My Account</Link>
                                    </li>
                                :
                                    null
                            }
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-links" onClick={()=>this.logout()}>Log Out</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                !user ?
                                    <li className="nav-item">
                                        <Link className="nav-links" to="/login">Log In</Link>
                                    </li>
                                :
                                    null
                            }

                            {
                                !user ?
                                    <li className="nav-item">
                                        <Link className="nav-links" to="/register">Register</Link>
                                    </li>
                                :
                                    null
                            }      
                        </ul>
                    </div>
                    <li className="icon nav-item">
                        <i className="actual-icon bi bi-list"></i>
                    </li>
                </nav> */}
            </div>
            
         );
    }


 
  
}

export default Navbar;