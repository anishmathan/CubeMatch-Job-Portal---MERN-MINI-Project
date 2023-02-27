import axios from "axios";
import { message } from "antd";
// import { useParams } from "react-router-dom";



export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", values);
    message.success("User Registered Successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Failed to Fetch Data");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const user = await axios.post("http://localhost:4000/api/users/login", values);
    message.success("Login success");
    localStorage.setItem("user", JSON.stringify(user.data));
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    message.error("invalid credentials");
  }
};



export const updateUser = (values) => async (dispatch) => {
  const userid = JSON.parse(localStorage.getItem("user"))._id;

  values._id = userid;

  dispatch({ type: "LOADING", payload: true });

  try {
    const user = await axios.post(`api/users/update/${userid._id}`);
    message.success("User updated successfully");
    localStorage.setItem("user", JSON.stringify(user.data));
    console.log("Localstorage:", JSON.parse(localStorage.getItem("user")));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("something went wrong , please try later");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};



// export const candilog= (values) => async (dispatch) => {
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     const user = await axios.post("/api/users/candilog", values);
//     message.success("Login success");
//     localStorage.setItem("user", JSON.stringify(user.data));
//     setTimeout(() => {
//       window.location.href = "/UserHome";
//     }, 1000);
//     dispatch({ type: "LOADING", payload: false });
//   } catch (error) {
//     message.error("invalid credentials");
//     dispatch({ type: "LOADING", payload: false });
//   }
// };