import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/actions/authAction";

function Login() {
  const navigate = useNavigate();
  const phone_number = "+10000000000";
  const password = "admin123";
  return (
    <div>
      <h1>Login</h1>
      <button
        className="bg-green-500 m-7 p-4 border-2"
        onClick={() => loginAction({ phone_number, password }, navigate)}
      >
        Login User
      </button>
    </div>
  );
}

export default Login;
