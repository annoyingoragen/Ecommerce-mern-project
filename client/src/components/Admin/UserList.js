import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productListStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {  clearErrors, deleteAdminUser, fetchAdminUsers } from "../../actions/userAction";
import { userAdminActions } from "../../reducers/userAdminReducer";



const UserList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const alert = useAlert();

  const { error, users, isDeleted,message } = useSelector((state) => state.userAdmin);

  const deleteUserHandler = (id) => {
    dispatch(deleteAdminUser(id));
  };
  console.log(message);
  console.log(isDeleted);
  console.log(error);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch(userAdminActions.DELETE_ADMIN_USER_RESET());
    }
    console.log(message);
    console.log(isDeleted);
    console.log(error);
    
    dispatch(fetchAdminUsers());
  }, [message,isDeleted,error,navigate,alert]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;