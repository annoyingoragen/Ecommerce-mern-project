// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = (  {isAdmin,Component} ) => {
//   let { isLoading, isAuthenticated, user } = useSelector((state) => state.user);
 
  
    
//         // If authorized, return an outlet that will render child elements
//         // If not, return element that will navigate to login page
//         console.log("here in rpute")
//         console.log(isLoading)
//         console.log(isAuthenticated);
//         isLoading=!isLoading;

//         if (isAdmin === true && user.role !== "admin") {
//           return <Navigate to="/login" />;
//           }
//           if(isLoading && isAuthenticated===true)
//             {
//               console.log("inside ot")
//                return (<Component/>)
//             }
//           return (isLoading && <Navigate to="/login" />)
//           ;
//     }


// export default ProtectedRoute;



import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
const ProtectedRoute = ({isAdmin}) => {
            let { isLoading, isAuthenticated, user } = useSelector((state) => state.user);

            if (isAdmin === true && user.role !== "admin") {
           
              console.log(isLoading);
                        return <Navigate to="/login" />;
                  }
            if(isLoading===false && isAuthenticated===true)
            {
              console.log("inside ot")
               return <Outlet/>
            }
          return (isLoading===false && <Navigate to="/login" />)
}
export default ProtectedRoute