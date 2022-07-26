import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { AuthContainer } from './../assets/styles/AuthContainer'

const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

function Login() {
  // const [cookies] = useCookies([]);
  const cookies = new Cookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.get('jwt')) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error:any) => {
    // toast.error(error, {
    //   position: "bottom-right",
    // });

  }
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          console.log(data)
          cookies.set('jwt', data.token, { path: '/', secure: false });
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <AuthContainer>
      <form className="Auth-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Queue Control</h3>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control mt-1"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Acessar
            </button>
          </div>
          {/* <p className="forgot-password text-right mt-2">
            Não possui conta? <Link to="/signup123"> Criar conta </Link>
          </p> */}
        </div>
      </form>
    </AuthContainer>
  );
}

export default Login;