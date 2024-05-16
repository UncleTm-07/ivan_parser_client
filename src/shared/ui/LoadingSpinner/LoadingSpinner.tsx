import React, {FC} from 'react';
import css from "./LoadingSpinner.module.css"

interface SpinnerProps{
    containerHeight?:string;
    spinnerHeight?:string;
    spinnerWidth?:string;
    padding?:string;

}
const LoadingSpinner:FC<SpinnerProps> = ({containerHeight,spinnerHeight, spinnerWidth, padding}) => {
    return (
        <div style={{height:containerHeight, padding:padding}} className={css.spinnerContainer}>
            <div style={{height:spinnerHeight, width:spinnerWidth}} className={css.spinner}></div>
        </div>
    );
};

export default LoadingSpinner;