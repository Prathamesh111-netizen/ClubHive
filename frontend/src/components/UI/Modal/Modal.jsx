import React, { useEffect, useState } from "react";
import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop/index";

const Modal = ({
    uploadPreview = null,
    show = null,
    children = null,
    style = null,
    hideBackdrop = null,
    className = null,
    name = null,
}) => {
    const [shouldRender, setRender] = useState(show);

    useEffect(() => {
        show && setRender(true);
    }, [show]);

    const onAnimationEnd = () => !show && setRender(false);

    return (
        shouldRender && (
            <React.Fragment>
                <Backdrop show={true} removeBackdrop={hideBackdrop} />
                <div
                    className={[
                        classes.Modal,
                        className ? className : ""
                    ].join(" ")}
                    style={{
                        animation: `${show ? classes.fadeIn : classes.fadeOut} 0.5s`,
                        ...style,
                    }}
                    onAnimationEnd={onAnimationEnd}
                    name={name}
                >
                    {children}
                </div>
            </React.Fragment >
        )
    );
};

export default React.memo(Modal);