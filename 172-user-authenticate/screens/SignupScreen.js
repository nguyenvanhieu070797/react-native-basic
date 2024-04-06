import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth'
import {useState, useContext} from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import {Alert} from "react-native";

import {AuthContext} from '../store/auth-context'

function SignupScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false)
  const athCtx = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setAuthenticating(true);

    try {
      const token = await createUser(email, password);
      athCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
          "Authentication failed",
          "Could not create user. Please check your credentials or try again later.");
      setAuthenticating(false);
    }

  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
