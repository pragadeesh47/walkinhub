import React, { useEffect, useState } from 'react';
import './Authentication.css';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../utils/AuthContext';

const Login = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/post-walkin";
  // Redirect if already logged in
  useEffect(() => {
    if (user?.emailVerified) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      if (loggedInUser.emailVerified) {
        toast.success("Login successful");
        navigate(from, { replace: true });
      } else {
        await signOut(auth);
        toast.error("Please verify your email before logging in.");
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="signup-root">
      <div className="login-form">
        <h2 className="signup-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="signup-field">
            <input
              type="email"
              placeholder="Email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <input
              type="password"
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup-button-wrapper">
            <button className="signup-button">

              {loading ? (
                'PLEASE WAIT...'
              ) : (
                'LOGIN'
              )}
            </button>
          </div>
        </form>

        <div className="signup-footer">
          Don’t have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>
        <div className="signup-footer">
          <Link to="/" className="signup-link">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
