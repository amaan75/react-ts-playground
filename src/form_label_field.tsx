import React, { ChangeEventHandler } from "react";

type FormFieldProps = {
    label: string,
    onChangeHandler: ChangeEventHandler<HTMLInputElement>,
    value: string,
    name:string

}

export const FormField = (props: FormFieldProps) => {
    return (
        <>
            <label>{props.label}</label>
            <input type="text" name={props.name} onChange={props.onChangeHandler} value={props.value} />
        </>
    );
}

