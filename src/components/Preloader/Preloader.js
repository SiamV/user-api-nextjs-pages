"use client"
import React from "react";
import classes from "./Preloader.module.css"

let Preloader = () => {
    return (
        <div>
            <div className={classes.ldsSpinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
export default Preloader;
