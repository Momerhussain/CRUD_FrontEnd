import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { update_user } from '../../api/userApi';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing, value }) => {
  const id = selectedEmployee.id;

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [phone, setPhone] = useState(selectedEmployee.phone);
  const [purpose, setPurpose] = useState(selectedEmployee.purpose);
  const [date, setDate] = useState(selectedEmployee.date);


  //Child to parent 
  function data(flag) {
    return value(flag)
  }
  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !purpose || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      firstName,
      lastName,
      phone,
      purpose,
      date,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        purpose: purpose,
        date: date
      }
      update_user(requestBody)
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
            setIsEditing(false);
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
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
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
          <input onClick={onSubmit} type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
