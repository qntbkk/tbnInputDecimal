import { ReactElement, createElement, useState, useEffect } from "react";
import { TbninputdecimalContainerProps } from "../typings/TbninputdecimalProps";
import Big from "big.js";

export function Tbninputdecimal({
    decimalAttribute,
    decimalPlaces,
    label
}: TbninputdecimalContainerProps): ReactElement {
    const [displayValue, setDisplayValue] = useState("");

    // Sync with Mendix attribute
    useEffect(() => {
        if (decimalAttribute?.value !== undefined) {
            setDisplayValue(decimalAttribute.value.toFixed(decimalPlaces));
        } else {
            setDisplayValue("");
        }
    }, [decimalAttribute.value, decimalPlaces]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setDisplayValue(value);

        // Update Mendix attribute
        if (value === "") {
            decimalAttribute.setValue(undefined);
        } else {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
                decimalAttribute.setValue(new Big(numValue));
            }
        }
    };

    return (
        <div>
            {label && <label>{label}</label>}
            <input type="text" value={displayValue} onChange={handleChange} disabled={decimalAttribute?.readOnly} />
        </div>
    );
}
