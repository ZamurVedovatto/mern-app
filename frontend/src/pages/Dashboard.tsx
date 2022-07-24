import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import Cookies from 'universal-cookie';

export default function Dashboard() {
  const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies([]);
  const cookies = new Cookies();

  useEffect(() => {
    const verifyUser = async () => {
      console.log('enrtou aqui 1')
      if (!cookies.get('jwt')) {
        console.log('enrtou aqui 2')
        navigate("/login");
      } else {
        console.log('enrtou aqui 3')
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          cookies.remove('jwt', { path: '/' })
          navigate("/login");
        } else
          // toast(`Hi ${data.user} 🦄`, {
          //   theme: "dark",
          // });
          console.log(data.user, 'logaado')
        }
    };
    verifyUser();
  }, [cookies, navigate ]);

  const logOut = () => {
    cookies.remove('jwt', { path: '/' })
    navigate("/login");
  };
  
  return (
    <>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log out</button>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}