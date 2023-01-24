import React from "react";
import {UserContext} from "../../../contexts/userContext";

export default function UserEmail(props: React.ComponentPropsWithRef<"span">) {
    const {curUser} = React.useContext(UserContext);
    if (curUser) {
        return <span className={`${props.className || ""}`}>{curUser.email}</span>;
    }
    return null;
}