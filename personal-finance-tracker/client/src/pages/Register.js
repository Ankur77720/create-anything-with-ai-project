import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import FormWrapper from "../components/FormWrapper";

export default function Register() {
    const { login } = useContext(AuthContext);
    const [ form, setForm ] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [ e.target.name ]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/register", form);
            login(res.data);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <FormWrapper title="Register" onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </FormWrapper>
    );
}
