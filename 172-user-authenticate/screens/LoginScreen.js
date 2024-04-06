import {useState, useContext} from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {login} from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Alert} from 'react-native';
import {AuthContext} from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false);

  const athCtx = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setAuthenticating(true);


    try {
      const token = await login(email, password);
      console.log({token});
      athCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
          "Authentication failed",
          "Could not log you in. Please check your credentials or try again later.");
      setAuthenticating(false);
    }

  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you ..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}  />;
}

export default LoginScreen;
