import React, { useEffect } from "react"

export default function Logger(WrappedComponent) {
    return function HOCComponent(props) {
        useEffect(() => {
            console.log("Component mounted");
            return () => {
                console.log(`Component will unmount.`);
            };
        }, [])

        return (<WrappedComponent {...props} />);
    };

}

