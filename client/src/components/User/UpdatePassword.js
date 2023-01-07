import React, { Fragment, useState, useEffect } from "react";
import "./updatePasswordStyles.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
// import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../reducers/userReducer";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, isLoading } = useSelector((state) => state.user);


  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

   
    console.log(`password 1 ${password}`);
    console.log(`password 1 ${confirmPassword}`);
    dispatch(updatePassword({oldPassword,password,confirmPassword}));
  };

  useEffect(()=>{
      if(error){
        alert.error(error);  
          dispatch(clearErrors()) 
      }
      if(isUpdated){
        alert.success("Profile updates successfully");
        dispatch(loadUser());
        navigate("/account");
        dispatch(userActions.UPDATE_PROFILE_RESET());
      }
      
  },[dispatch,error,alert,isUpdated,navigate,user]);
  return (
    <Fragment>
    {isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              onSubmit={updatePasswordSubmit}
            >
              <div className="loginPassword">
                <VpnKeyIcon />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  );
};

export default UpdatePassword;