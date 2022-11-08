import { Fragment } from "react";
import LoginForm from "../components/Sections/loginPage/LoginForm";

const LoginPage = props => {
   return (
      <Fragment>
         <LoginForm type={props.type} />
      </Fragment>
   );
};

export default LoginPage;
