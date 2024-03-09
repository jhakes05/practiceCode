import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook for navigation
import LoginStyle from "./Login.module.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";

interface User {
  user_name: string;
  password: string;
  role: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User[]>([]);
  const [errorMessages, setErrorMessages] = useState<{
    name: string;
    message: string;
  }>({ name: "", message: "" });

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    try {
      const result = await axios.get<User[]>("http://localhost:8080/user");
      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { uname, pass } = event.currentTarget;

    const matchedUser = user.find(
      (u) => u.user_name === uname.value && u.password === pass.value
    );

    if (matchedUser) {
      // Navigate based on user role
      switch (matchedUser.role) {
        case "admin":
          navigate("/admin");
          break;
        case "student":
          navigate("/student");
          break;
        case "instructor":
          navigate("/instructor");
          break;
        default:
          break;
      }
    } else {
      setErrorMessages({
        name: "invalid",
        message: "Invalid username or password",
      });
    }
  };

  return (
    <div className={LoginStyle.mainContainer}>
      <form
        action=""
        onSubmit={handleSubmit}
        className={LoginStyle.formContainer}>
        <p className={LoginStyle.text}>MAG LOG IN KANA!</p>
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          name="uname"
        />
        <TextField
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
          name="pass"
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        {errorMessages.message && <div>{errorMessages.message}</div>}{" "}
        {/* Display error message if exists */}
      </form>
    </div>
  );
};

export default Login;
