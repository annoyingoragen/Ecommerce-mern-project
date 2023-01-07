import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import {
  fetchAdminUser,
  updateAdminUser,
  clearErrorsAdmin,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { userAdminActions } from "../../reducers/userAdminReducer";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const naviagte=useNavigate();
  

  const { isLoading, error, user,isUpdated } = useSelector((state) => state.userAdmin);

  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id} = useParams();
console.log(id);
  useEffect(() => {
    if (user==undefined ) {
        console.log(1234)
      dispatch(fetchAdminUser(id));
    } else {
        console.log(user)
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrorsAdmin());
    }

 

    if (isUpdated) {
      alert.success("User Updated Successfully");
      naviagte("/admin/users");
      dispatch(userAdminActions.UPDATE_ADMIN_USER_RESET());
    }
  }, [dispatch, alert, error,  isUpdated, naviagte, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateAdminUser(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {isLoading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  isLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;