import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Login</h1>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Auth" />
        </div>
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Enter Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Enter Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="auth-footer">
            <p>New to Flipkart? <Link to="/signup">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
