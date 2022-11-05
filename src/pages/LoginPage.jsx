import { Fragment } from "react";
import LoginForm from "../components/sections/loginPage/LoginForm";

const LoginPage = props => {
   return (
      <Fragment>
         <LoginForm type={props.type} />
      </Fragment>
   );
};

export default LoginPage;
