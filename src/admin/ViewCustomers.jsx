import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Can be 'success', 'error', 'warning', 'info'

  const displayCustomers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallcustomers`);
      setCustomers(response.data);
    } catch (err) {
      setError("Failed to fetch customers data ... " + err.message);
      setSnackbarMessage("Failed to fetch customers data.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    displayCustomers();
  }, []);

  const deleteCustomer = async (cid) => {
    try {
      const response = await axios.delete(`${config.url}/admin/deletecustomer?cid=${cid}`);
      setSnackbarMessage(`Deleted customer with ID: ${cid}`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      displayCustomers(); // Refresh the customer list
    } catch (err) {
      console.log(err);
      setError("Unexpected Error Occurred while deleting...");
      setSnackbarMessage("Error deleting customer.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const acceptCustomer = async (cid) => {
    // In a real application, you would make an API call to accept the customer
    console.log(`Accepting customer with ID: ${cid}`);
    setSnackbarMessage(`Customer with ID: ${cid} accepted.`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    // Optionally, you might want to refresh the customer list here if the status changes
  };

  const rejectCustomer = async (cid) => {
    // In a real application, you would make an API call to reject the customer
    console.log(`Rejecting customer with ID: ${cid}`);
    setSnackbarMessage(`Unfortunately, customer with ID: ${cid} rejected.`);
    setSnackbarSeverity("warning");
    setSnackbarOpen(true);
    // Optionally, you might want to refresh the customer list here if the status changes
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
        <u>View All Customers</u>
      </h3>

      {error ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      ) : customers.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          No Customer Data Found
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Username</th>
              <th>Mobile No</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.gender}</td>
                <td>{customer.dob}</td>
                <td>{customer.email}</td>
                <td>{customer.username}</td>
                <td>{customer.mobileno}</td>
                <td>{customer.location}</td>
                <td>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      deleteCustomer(customer.id);
                    }}
                    style={{ marginRight: "8px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => {
                      acceptCustomer(customer.id);
                    }}
                    style={{ marginRight: "8px" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelOutlinedIcon />}
                    onClick={() => {
                      rejectCustomer(customer.id);
                    }}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}