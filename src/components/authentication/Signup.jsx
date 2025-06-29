import React, { useEffect, useState } from 'react';
import './Authentication.css';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../utils/AuthContext';

const Signup = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/post-walkin";

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user?.emailVerified) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await sendEmailVerification(newUser);
      setLoading(false);
      toast.success("Verification email sent. Please check your inbox.");
      navigate("/login", { state: { from } });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="signup-root">
      <div className='login-form'>
        <h2 className="signup-title">Sign up</h2>
        <div>
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

              <button className='signup-button'>
                {loading ? (
                  'PLEASE WAIT...'
                ) : (
                  'SIGNUP'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className='signup-footer' >
          Already have an account?{" "}
          <Link className='signup-link' to="/login" state={{ from }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;