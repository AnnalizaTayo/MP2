import React, { useState, useEffect } from "react";
import { DayPicker } from 'react-day-picker';
import {BsTrashFill} from 'react-icons/bs'
import 'react-day-picker/dist/style.css';
import "./VetConsultationPage.css";

const VetConsultationPage = () => {
  const userString = localStorage.getItem("user");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userString) {
      setUser(JSON.parse(userString));
    } else {
      alert("You are not logged in. Please login to your account.");
      window.location.href = "/login";
    }
  }, [userString]);

  const [consultationDate, setConsultationDate] = useState(null);
  const [consultationTime, setConsultationTime] = useState("");
  const [concern, setConcern] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [consultationLog, setConsultationLog] = useState([]);
  const [consultationSchedule, setConsultationSchedule] = useState([]);

  useEffect(() => {
    // Fetch the user data from the API
    fetch("https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        const foundUser = data.find((u) => u.email === user?.email);
        if (foundUser) {
          setConsultationLog(foundUser.vetconsultationlog || []);
          setConsultationSchedule(foundUser.vetconsultationschedule || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.email]);

  const handleDayClick = (date) => {
    // Check if the clicked day is a weekend (Saturday or Sunday)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return; // Do nothing for weekends
    }
    setConsultationDate(date);
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      setAvailableTimes(["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]);
    } else {
      setAvailableTimes([]);
    }
  };

  const handleTimeChange = (event) => {
    setConsultationTime(event.target.value);
  };

  const handleConcernChange = (event) => {
    setConcern(event.target.value);
  };

  const handleScheduleConsultation = (event) => {
    event.preventDefault();
    // Check if the consultation date and time are selected
    if (!consultationDate || !consultationTime) {
      setErrorMessage("Please select a date and time for the consultation.");
      return;
    }

    // Check if availableTimes is defined and not empty
    if (!Array.isArray(availableTimes) || availableTimes.length === 0) {
      setErrorMessage("No available times for the selected date.");
      return;
    }

    // Check if the selected date and time are available
    const isAvailable = consultationSchedule.every(appointment => {
      return (
        appointment.date !== consultationDate.toISOString() ||
        appointment.time !== consultationTime
      );
    });

    if (!isAvailable) {
      setErrorMessage("The selected date and time are not available. Please choose another.");
      return;
    }

    // Check if the selected date and time are in the future
    const now = new Date();
    if (
      consultationDate < now ||
      (consultationDate.getTime() === now.getTime() &&
        consultationTime <= now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    ) {
      setErrorMessage("Please select a future date and time.");
      return;
    }

    // Generate a unique reference number
    const referenceNumber = Math.random().toString(36).substr(2, 9);

    // Prepare the appointment data to be posted
    const appointmentData = {
      referenceNumber: referenceNumber,
      petName: user.petName || "",
      concern: concern,
      date: consultationDate.toISOString(),
      time: consultationTime,
    };

    // Get the user ID
    const userId = user.id;

    // Post the appointment data to the API
    fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vetconsultationlog: [
          ...consultationLog,
          {
            referenceNumber: appointmentData.referenceNumber,
            logType: "set",
            logDate: new Date().toISOString(),
            appointmentDate: appointmentData.date,
            appointmentTime: appointmentData.time,
          },
        ],
        vetconsultationschedule: [
          ...consultationSchedule,
          {
            referenceNumber: appointmentData.referenceNumber,
            petName: appointmentData.petName,
            concern: appointmentData.concern,
            date: appointmentData.date,
            time: appointmentData.time,
          },
        ],
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Display a success message or redirect to a confirmation page
        alert("Consultation scheduled successfully!");

        setConsultationLog(data.vetconsultationlog);
        setConsultationSchedule(data.vetconsultationschedule);

        // Clear the input fields
        setConsultationDate(null);
        setConsultationTime("");
        setConcern("");
        setErrorMessage("");
      })
      .catch(error => {
        console.error("Error scheduling consultation:", error);
        alert("An error occurred while scheduling the consultation. Please try again later.");
      });
  };

  const handleCancelAppointment = (referenceNumber) => {
    // Find the appointment to be canceled
    const appointment = consultationSchedule.find(appt => appt.referenceNumber === referenceNumber);
    if (!appointment) {
      console.error("Appointment not found.");
      return;
    }

    // Update the consultation schedule by removing the canceled appointment
    const updatedSchedule = consultationSchedule.filter(appt => appt.referenceNumber !== referenceNumber);
    setConsultationSchedule(updatedSchedule);

    // Create a cancellation log
    const cancellationLog = {
      referenceNumber: appointment.referenceNumber,
      logType: "cancel",
      logDate: new Date().toISOString(),
      appointmentDate: appointment.date,
      appointmentTime: appointment.time,
    };

    // Update the consultation log with the cancellation log
    const updatedLog = [...consultationLog, cancellationLog];
    setConsultationLog(updatedLog);

    // Make a PUT request to update the API with the updated consultation log and schedule
    fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vetconsultationlog: updatedLog,
        vetconsultationschedule: updatedSchedule,
      }),
    })
      .then(response => response.json())
      .then(data => {
        alert("Appointment canceled successfully!");
      })
      .catch(error => {
        console.error("Error canceling appointment:", error);
        alert("An error occurred while canceling the appointment. Please try again later.");
      });
  };

  return (
    <div className="vet-consultation-page">
      {/* Display the pet information */}
      <aside className="pet-information">
        <div className="pet-profile">
          <img src={user?.petPicture} alt="Pet" />
          <h2>{user?.petName}</h2>
          <p>Type: {user?.petType}</p>
        </div>
        <div className="appointment-schedule loglist">
          <h2>Upcoming Appointments</h2>
          {consultationSchedule.length === 0 ? (
            <p>No upcoming appointments</p>
          ) : (
            <div className="appointmentList-container">
              <ul className="appointmentList">
                <li className="consultationListHead">
                  <span>Date</span>
                  <span>Time</span>
                  <span>Concern</span>
                  <span>Cancel</span>
                </li>
                {consultationSchedule.map((appointment) => (
                  <li className="consultationList" key={appointment.referenceNumber}>
                    <span>{`${new Date(appointment.date).toLocaleDateString()}`}</span>
                    <span>{`${appointment.time}`}</span>
                    <span>{`${appointment.concern}`}</span>
                    <button className="cancelAppointment" onClick={() => handleCancelAppointment(appointment.referenceNumber)}>
                      <BsTrashFill/>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
          )}
        </div>
        <div className="consultation-log loglist">
          <h2>Consultation Log</h2>
          {consultationLog.length === 0 ? (
            <p>No consultation log entries</p>
          ) : (
            <div className="appointmentList-container">
              <ul className="appointmentList">
                <li className="consultationListHead">
                  <span>Log Date</span>
                  <span>Appt. Date</span>
                  <span>Appt. Time</span>
                  <span>Type</span>
                </li>
                {consultationLog.map((log) => (
                  <li className="consultationLogList" key={log.referenceNumber}>
                    <span>{`${new Date(log.logDate).toLocaleString()}`}</span>
                    <span>{`${new Date(log.appointmentDate).toLocaleDateString()}`}</span>
                    <span>{`${log.appointmentTime}`}</span>
                    <span>{`${log.logType}`}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          )}
        </div>
      </aside>

      {/* Display the consultation scheduler */}
      <div className="consultation-scheduler">
        <h3>Schedule a Vet Consultation</h3>
        <form onSubmit={handleScheduleConsultation}>
          <div className="form-group">
            <label htmlFor="consultationDate">Consultation Date:</label>
            <DayPicker selected={consultationDate} onDayClick={handleDayClick} />
          </div>
          <div className="form-group">
            <label htmlFor="consultationTime">Consultation Time:</label>
            <select
              id="consultationTime"
              value={consultationTime}
              onChange={handleTimeChange}
              disabled={!consultationDate}
            >
              <option value="">Select a time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="concern">Concern:</label>
            <textarea
              id="concern"
              value={concern}
              onChange={handleConcernChange}
              placeholder="Enter your pet's health concern"
              disabled={!consultationDate || !consultationTime}
            ></textarea>
          </div>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <button type="submit" disabled={!consultationDate || !consultationTime}>
            Schedule Consultation
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default VetConsultationPage;
