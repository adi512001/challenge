import React, { useState, useEffect } from 'react';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import NavBar from './components/NavBar';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import history from './history';;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6519b5'
    },
    secondary: {
      main: '#6519b575'
    }
  },
});

const initUsers = [
  { name: 'Adi Carmely' },
  { name: 'Chen Kataev' },
  { name: 'Ofek Sharon' },
  { name: 'Chen Carmely' },
  { name: 'Shani Kataev' },
  { name: 'Asaf Carmely' },
  { name: 'Ohad Lalezar' },
  { name: 'Orel Asaf' },
  { name: 'Noam Cohen' },
  { name: 'Edna Sharon' },
  { name: 'Chen Ronen' },
  { name: 'Noam Reinshtein' },
  { name: 'Yali Rotem' },
  { name: 'Vered Lalezar' },
  { name: 'Shahar Koresh' },
];

export default function App() {
  const [users, setUsers] = useState<{ name: string }[]>(initUsers);
  const [selectedOptions, setSelectedOptions] = useState<{ name: string }[]>([]);
  const [userSubscribed, setUserSubscribed] = useState('false');

  useEffect(() => {
    setSelectedOptions(JSON.parse(localStorage.getItem('users') as string));
    setSelectedOptions(JSON.parse(localStorage.getItem('selectedOptions') as string));
    setUserSubscribed(JSON.parse(localStorage.getItem('userSubscribed') as string));
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/:id">
            <Subscribe selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} users={users} setUsers={setUsers} />
          </Route>
          <Route path="/">
            <Home selectedOptions={selectedOptions} userSubscribed={userSubscribed} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
