import './loginSignUpStyles.css'
import Loader from '../layout/Loader/Loader';
import {useEffect, useRef,useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import {useSelector,useDispatch} from 'react-redux';
import profile from '../../images/Profile.png';
import { clearErrors, login,register } from '../../actions/userAction';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';


const LoginSignUp=()=>{

    const loginTab=useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const {isLoading,error,isAuthenticated}=useSelector((state)=>state.user);


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });
    
      const { name, email, password } = user;

      const [avatar, setAvatar] = useState("");
      const [avatarPreview, setAvatarPreview] = useState(profile);
      const [title,setTitle]=useState("Login");


    const switchTabs=(e,tab)=>{
        if (tab === "login") {
            setTitle("Login");
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
      
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
          }
          if (tab === "register") {
            setTitle("Register");
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          }
    };

    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login({loginEmail,loginPassword}));
    }

    const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        if(avatar!==profile){
            
        myForm.set("avatar", avatar);
        }
        else{
            
        myForm.set("avatar", "");
        }
        dispatch(register(myForm));
      };

    
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };

      const alert = useAlert();
      let location = useLocation();
      
      
      const redirect=location.search? location.search.split("=")[1]:"account";
     
      useEffect(()=>{
        console.log(error);
          if(error){
            if(error.message){
                alert.error(error.message); 
            }
           else{
            alert.error(error);
           }
              dispatch(clearErrors()) 
          }
          if(isAuthenticated){
            console.log("Login");
            navigate(`/${redirect}`);
          }
          
      },[dispatch,error,alert,isAuthenticated,navigate,redirect]);

    return(
        <>
                {isLoading ? (
                <Loader />
            ) : (
                    <>
                    <MetaData title={title}/>
                        <div className="LoginSignUpContainer">
                            <div className="LoginSignUpBox">
                                <div>
                                    <div className="login_signUp_toggle">
                                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>
                                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                    <div className="loginEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>
                                    <Link to="/password/forgot">Forget Password ?</Link>
                                    <input type="submit" value="Login" className="loginBtn" />
                                </form>


                                <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                                 >
                                    <div className="signUpName">
                                        <FaceIcon />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="signUpEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="signUpPassword">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            value={password}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div id="registerImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <input type="submit" value="Register" className="signUpBtn" />
                                </form>

                            </div>
                        </div>
                    </>
                )}
        
        </>
    )
}

export default LoginSignUp;