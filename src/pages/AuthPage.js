import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const addHandler = (userData) => {
    console.log(userData);
  };
  return <AuthForm onAddData={addHandler} />;
};

export default AuthPage;
