import axios from 'axios';
import Cookies from 'js-cookie';
const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: `${baseUrl}/api`,
});
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
export const login = async ({ username, password }) => {
  try {
    const res = await api.post(`/auth/login`, {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message + ' unable to process your request');
    }
  }
};
export const register = async (data) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error('Error:', error.message);
    }
  }
};
export const getUserExpense = async () => {
  try {
    const token = Cookies.get('splitWise-login-token');
    setAuthToken(token);
    const res = await api.get('/expanse');
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');
        navigate('/login');
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
export const getUserGroups = async () => {
  try {
    const token = Cookies.get('splitWise-login-token');
    setAuthToken(token);
    const res = await api.get('/user/groups');
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');
        navigate('/login');
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getGroupDetail = async (g_id) => {
  try {
    console.log('grid', g_id);
    const token = Cookies.get('splitWise-login-token');
    setAuthToken(token);
    const res = await api.get(`/group/${g_id}`);
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');
        navigate('/login');
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
export const getUserTransaction = async () => {
  try {
    const token = Cookies.get('splitWise-login-token');
    await delay(1000);
    setAuthToken(token);
    const res = await api.get(`/user/transaction`);
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');

        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const getGroupList = async () => {
  try {
    const token = Cookies.get('splitWise-login-token');
    await delay(1000);
    setAuthToken(token);
    const res = await api.get(`/group`);
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');

        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const createNewExpense = async (newExpense) => {
  try {
    const token = Cookies.get('splitWise-login-token');
    await delay(1000);
    setAuthToken(token);
    const res = await api.post(`/expanse`, newExpense);
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');

        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const getUserList = async () => {
  try {
    const token = Cookies.get('splitWise-login-token');
    setAuthToken(token);
    const res = await api.get('/user');
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
export const createNewGroup = async (newGroup) => {
  try {
    const token = Cookies.get('splitWise-login-token');
    await delay(1000);
    setAuthToken(token);
    const res = await api.post(`/group`, newGroup);
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const getNonGroupMembers = async (groupId) => {
  try {
    const token = Cookies.get('splitWise-login-token');
    await delay(1000);
    setAuthToken(token);
    const res = await api.get(`/group/${groupId}/non-members`);
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const addNewMembrsToGroup = async (groupId, newMembers) => {
  try {
    const token = Cookies.get('splitWise-login-token');
    await delay(1000);
    setAuthToken(token);
    const res = await api.put(`/group/${groupId}/members`, newMembers);
    console.log('res', res);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('splitWise-login-token');
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
