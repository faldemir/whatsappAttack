import React, { useCallback, useEffect } from "react";
import { Alert } from "components/ui";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignIn } from "@clerk/clerk-react";
import authlocal from 'utils/hooks/useAuth';

const SignInForm = (props) => {
  const { className } = props;
  const [message, setMessage] = useTimeOutMessage();
  const { signIn:signInBack } = authlocal()
  const { getToken, signIn } = useAuth(); // Hook para autenticar con Clerk
  const { isSignedIn, user, isLoaded } = useUser()
  // Función para iniciar sesión en el backend después de Clerk
  const handleBackendLogin = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Failed to retrieve Clerk token.");
      }
      console.info("token: "+token);
      await signInBack({ userName: "ClerkUser", password: token })
      
      // Envía el token al backend para continuar la autenticación
      const result = await signIn({ userName: "ClerkUser", password: token });

      
      if (result.status === "failed") {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage(error.message || "An error occurred during sign-in.");
    }
  }, [getToken, signIn, setMessage]);

  // Escucha cambios en la sesión de Clerk
  useEffect(() => {
    if (isSignedIn) {
      handleBackendLogin();
    }
  }, [handleBackendLogin, isSignedIn]);

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <div className="flex justify-center items-center ">
        <SignIn
          afterSignInUrl="/dashboard" // Redirigir si Clerk maneja toda la autenticación
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignInForm;
