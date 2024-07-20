import React, { useEffect } from "react";
import {
    useLocation,
    useNavigationType,
    NavigationType
} from "react-router-dom";
  
const useBackListener = (callback: () => void) => {
    const initialRender = React.useRef(true);

    const location = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (!initialRender.current && navigationType === NavigationType.Pop) {
            console.log("he")
            initialRender.current = false;
            callback();
        }

    }, [callback, location, navigationType]);
};
  
export default useBackListener