import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allTeams, setAllTeams] = useState([]);
  const [teamRoasters, setTeamRoasters] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState('');




  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      const userId = JSON.parse(storedUser)._id;
      setUserId(userId);
    }

    axios.get('http://localhost:5000/getTeams')
    .then(function (response) {
      const allTeams = response.data;
      // console.log(allTeams)
      setAllTeams(allTeams);
    }
    )
    .catch(function (error) {
      console.log(error);
    }
    )

    axios.get('http://localhost:5000/getTeamRoasters')
    .then(function (response) {
      const teamRoasterData = response.data;
      // console.log(teamRoasterData);
      setTeamRoasters(teamRoasterData);
    })
    .catch(function (error) {
      console.error('Error fetching team roasters:', error);
    });

     
  }, []);

  const login = (userData) => {
    // You can implement your login logic here and set the user data

    setUser(userData);
  };

  const logout = () => {
    // Implement the logout logic and clear user data
    setUser(null);

    // Clear user data from localStorage as well
    localStorage.removeItem('user');
  };

  const teamRoasterData = teamRoasters;
  const allTeamsData = allTeams;

  const userTasks = tasks;


  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, teamRoasterData,allTeamsData }}>
      {children}
    </AuthContext.Provider>
  );
};
