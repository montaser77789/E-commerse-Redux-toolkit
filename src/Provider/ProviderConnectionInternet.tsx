import { ToastId, useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { BsWifiOff } from "react-icons/bs";

interface Iprops {
  children: ReactNode;
}

function ProviderConnectionInternet({ children }: Iprops) {
  const [isOnline, setisOnline] = useState(true);
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>();

  const close = useCallback(() => {
    toast.closeAll();
  }, [toast]);

  const setOnline = useCallback(() => {
    close();
    setisOnline(true);
  }, [close]);

  const setOffline = useCallback(() => {
    setisOnline(false);
  }, []);

  const addToast = () => {
    toastIdRef.current = toast({
      title: 'You\'re offline.',
      description: 'Please check your internet connection!',
      status: 'warning',
      duration: 9000,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  };

  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, [setOnline, setOffline]);

  if (!isOnline) {
    return (
      <>
        {children}
        {addToast()}
      </>
    );
  }

  return <>{children}</>;
}

export default ProviderConnectionInternet;
