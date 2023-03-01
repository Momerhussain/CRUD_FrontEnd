import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { create_user } from '../../api/userApi';

const Add = ({ employees, setEmployees, setIsAdding, value }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState('');
  //Child to parent 
  function data(flag) {
    return value(flag)
  }
  const handleAdd = e => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !purpose || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      phone,
      purpose,
      date,
    };

    employees.push(newEmployee);
    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        purpose: purpose,
        date: date
      }
      create_user(requestBody)
        .then(response => {
          console.log(response);
          if (response?.data?.status) {

            Swal.fire({
              icon: 'success',
              title: 'Added!',
              text: `${response.data.response}`,
              showConfirmButton: false,
              timer: 1500,
            });
            setFirstName('')
            setLastName('')
            setPhone('')
            setPurpose('')
            setDate('')
            setIsAdding(false)
            data(true)
          } else {
            return Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: `${response.data.response}`,
              showConfirmButton: true,
            });
          }
        }).catch(error => {
          console.log(error);
        });
    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Personal Information</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="lastName">Phone</label>
        <input
          id="phone"
          type="number"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <label htmlFor="purpose">Purpose</label>
        <input
          id="purpose"
          type="text"
          name="purpose"
          value={purpose}
          onChange={e => setPurpose(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input onClick={onSubmit} type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
