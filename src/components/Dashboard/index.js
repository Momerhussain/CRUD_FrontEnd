import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { delete_user, get_user } from '../../api/userApi';

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [flag, setflag] = useState(false)
  const [users, setUsers] = useState([])
  //Parent receive data
  const value = (flag) => {
    console.log(flag);
    setTimeout(() => {
      setflag(flag => !flag)

    }, 3000);
  }

  const getUsers = async () => {
    try {

      get_user()
        .then(response => {
          if (response?.status) {
            console.log(response);
            setUsers(response);
            setEmployees(response.data)
          }
        }).catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (id) => {
    try {

      delete_user(id)
        .then(response => {
          console.log(response);
          if (response?.status) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `Data has been deleted.`,
              showConfirmButton: false,
              timer: 1500,
            });
            value(true)

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Deleted!',
              text: `Data not found`,
              showConfirmButton: false,
              timer: 1500,
            });

          }
        }).catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("run");
    getUsers()
  }, [flag])

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem('employees_data'));
    if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
  }, []);

  const handleEdit = id => {
    const [employee] = employees.response.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    console.log(id);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [employee] = employees.response.filter(employee => employee.id === id);
        console.log(employee);
        deleteUser(id)
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
          value={value}

        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
          value={value}
        />
      )}
    </div>
  );
};

export default Dashboard;
