import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [, setError] = useState(null);
  const [message, setMessage] = useState("");

  const { signUp } = useAuth();

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signUp({ email, password });

    if (error) {
      setError(error);
      setMessage("Senha ou email incorretos");
      return;
    }

    navigate("/");
  }

  return (
    <div className="text-center div">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          ref={emailRef}
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign up
        </button>
        <Link to="/login">
          Login
        </Link>
      </form>

      { message ? <p>{message}</p> : "" }
    </div>
  );
}

export default SignUp;
