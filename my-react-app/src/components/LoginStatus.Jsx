
const LoginStatus = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Bem-vindo de volta!</h1>
      ) : (
        <h1>Por favor, faça login.</h1>
      )}
    </div>
  );
};

export default LoginStatus;
          