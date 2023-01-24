import React from "react";
import {UserContext} from "../../../contexts/userContext";

interface PictureProps extends React.ComponentPropsWithRef<"img"> {
    src?: string;
}

export default function UserPicture(props: React.ComponentPropsWithRef<"img">) {
    const {curUser} = React.useContext(UserContext);
    if (curUser) {
        return <img className={`${props.className || ""}`} src={curUser.profileImage}></img>;
    }
    return null;
}