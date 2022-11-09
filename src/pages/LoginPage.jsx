import LoginForm from "../components/loginPage/loginForm/LoginForm";

export default function LoginPage(props) {
   return (
      <>
         <LoginForm type={ props.type } />
      </>
   );
};
