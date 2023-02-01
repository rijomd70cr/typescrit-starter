import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../Store/Store";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IUseFetchWithAbortResponse {
  fetchedData: unknown;
  isLoading: boolean;
  error: Error | null;
}

// **************************  Redux Store ***********************
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// **************************  Redux Store ***********************

export const useRouting = (path: string) => {
  const navigate = useNavigate();
  navigate(path);
};

// **************************  mobile device ***********************
export const useMobile = () => {
  const useMobile = useMediaQuery("(max-width:600px)");
  return useMobile;
};
// ************************** mobile device***********************

// ************************** Online status ***********************
export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return isOnline;
};
// ************************** Online status ***********************

// ************************** fetching method ***********************
export const useFetchWithAbort = (
  endpoint: string,
  options?: any
): IUseFetchWithAbortResponse => {
  const [fetchedData, setFetchedData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    (async () => {
      try {
        if (endpoint) {
          const response = await fetch(endpoint, {
            ...options,
            signal: abortController.signal,
          });
          const newData = await response.json();
          setIsLoading(false);
          setFetchedData(newData);
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          setError(error);
        }
        if (abortController.signal.aborted) {
          console.log("The user aborted the request");
        } else {
          console.error("The request failed");
        }
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [endpoint, options]);

  return { fetchedData, isLoading, error };
};
// ************************** fetching method***********************
