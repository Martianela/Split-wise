import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth.utils';

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isLoggedIn()) {
        navigate('/login');
      }
    }, []);
    return <Component {...props} />;
  };
};

export default withAuth;
