import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import FormWrapper from "../components/FormWrapper";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [ form, setForm ] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [ e.target.name ]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            login(res.data);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <FormWrapper title="Login" onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </FormWrapper>
    );
}
