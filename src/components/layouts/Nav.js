/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const { user, signOut } = useAuth();
  let navigate = useNavigate();

  function handleSignout() {
    signOut();
  }

  console.log('user:', user?.id)
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="index.html">BLOG do LuizDev</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto py-4 py-lg-0">
                    <li className="nav-item">
                      <a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">Início</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-lg-3 py-3 py-lg-4" href="about.html">Sobre</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-lg-3 py-3 py-lg-4" href="post.html">Post</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">Contato</a>
                    </li>

                    {
                      user
                        ?
                          <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="/"
                              onClick={handleSignout}
                            >
                              Sair
                            </a>
                          </li>
                        :
                          <li className="nav-item">
                            <Link to="/login" className="nav-link px-lg-3 py-3 py-lg-4">
                              Entrar
                            </Link>
                          </li>
                    }
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Nav;
