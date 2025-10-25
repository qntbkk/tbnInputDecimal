import { ReactElement, createElement, useState, useEffect } from "react";
import { TbninputdecimalContainerProps } from "../typings/TbninputdecimalProps";
import Big from "big.js";

export function Tbninputdecimal({
    decimalAttribute,
    decimalPlaces,
    label
}: TbninputdecimalContainerProps): ReactElement {
    const [displayValue, setDisplayValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // Format number with thousands separator
    const formatNumber = (bigValue: Big | undefined): string => {
        if (!bigValue) return "";
        const stringValue = bigValue.toFixed(decimalPlaces);
        const [integerPart, decimalPart] = stringValue.split(".");
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    // Sync with attribute (only when not focused)
    useEffect(() => {
        if (!isFocused) {
            if (decimalAttribute?.value !== undefined) {
                setDisplayValue(formatNumber(decimalAttribute.value));
            } else {
                setDisplayValue("");
            }
        }
    }, [decimalAttribute.value, decimalPlaces, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const unformatted = value.replace(/,/g, ""); // Remove commas

        // Validate: numbers, decimal point only
        const regex = new RegExp(`^-?\\d*\\.?\\d{0,${decimalPlaces}}$`);
        if (regex.test(unformatted) || unformatted === "" || unformatted === ".") {
            setDisplayValue(value);

            if (unformatted === "" || unformatted === ".") {
                decimalAttribute.setValue(undefined);
            } else {
                const numValue = parseFloat(unformatted);
                if (!isNaN(numValue)) {
                    decimalAttribute.setValue(new Big(numValue));
                }
            }
        }
    };

    const handleBlur = (): void => {
        setIsFocused(false);
    };

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    return (
        <div>
            {label && <label>{label}</label>}
            <input
                type="text"
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={decimalAttribute?.readOnly}
            />
        </div>
    );
}
