import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const items = [
  { id: 1, name: 'Item 1', category: 'Category A', date:
  '2024-06-01' },
  { id: 2, name: 'Item 2', category: 'Category B', date:
  '2024-06-02' },
  { id: 3, name: 'Item 3', category: 'Category A', date:
  '2024-06-03' },
];

const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const setUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const authenticateUser = (username, password) => {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    localStorage.setItem('token', JSON.stringify({ userId: user.id, username: user.username}));
    const itemsList = localStorage.getItem('itemsList')
    console.log(itemsList)
    if (itemsList === undefined){
      localStorage.setItem('itemsList',JSON.stringify(items))
    }
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const registerUser = (username, password) => {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ id: uuidv4(), username, password: hashedPassword });
    setUsers(users);
    return true;
  }
  return false;
};
