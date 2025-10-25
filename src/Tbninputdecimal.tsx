import { ReactElement, createElement, useState, useEffect, useRef } from "react";
import { TbninputdecimalContainerProps } from "../typings/TbninputdecimalProps";
import "./ui/TbnInputDecimal.css";
import Big from "big.js";

export function Tbninputdecimal({
    decimalAttribute,
    decimalPlaces,
    label,
    onChangeAction,
    class: className
}: TbninputdecimalContainerProps): ReactElement {
    const [displayValue, setDisplayValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Format number with thousands separator
    const formatNumber = (bigValue: Big | undefined): string => {
        if (!bigValue) return "";
        const stringValue = bigValue.toFixed(decimalPlaces);
        const [integerPart, decimalPart] = stringValue.split(".");
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    // Calculate cursor position after formatting
    const calculateCursorPosition = (oldValue: string, newValue: string, oldCursor: number): number => {
        const commasBefore = (oldValue.slice(0, oldCursor).match(/,/g) || []).length;
        const commasAfter = (newValue.slice(0, oldCursor).match(/,/g) || []).length;
        return oldCursor + (commasAfter - commasBefore);
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

    const handleBlur = (): void => {
        setIsFocused(false);
    };

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const cursorPos = e.target.selectionStart || 0;
        const unformatted = value.replace(/,/g, "");

        const regex = new RegExp(`^-?\\d*\\.?\\d{0,${decimalPlaces}}$`);
        if (regex.test(unformatted) || unformatted === "" || unformatted === ".") {
            const oldValue = displayValue;
            setDisplayValue(value);

            const newCursor = calculateCursorPosition(oldValue, value, cursorPos);
            requestAnimationFrame(() => {
                if (inputRef.current) {
                    inputRef.current.setSelectionRange(newCursor, newCursor);
                }
            });

            if (unformatted === "" || unformatted === ".") {
                decimalAttribute.setValue(undefined);
                // Execute action on change
                if (onChangeAction?.canExecute) {
                    onChangeAction.execute();
                }
            } else {
                const numValue = parseFloat(unformatted);
                if (!isNaN(numValue)) {
                    decimalAttribute.setValue(new Big(numValue));
                    // Execute action on change
                    if (onChangeAction?.canExecute) {
                        onChangeAction.execute();
                    }
                }
            }
        }
    };

    const validationFeedback = decimalAttribute?.validation;
    const hasError = validationFeedback !== undefined;

    return (
        <div className={`tbn-input-decimal ${className}`}>
            {label && <label className="tbn-input-decimal-label">{label}</label>}
            <div className="tbn-input-decimal-input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    value={displayValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="tbn-input-decimal-input"
                    disabled={decimalAttribute?.readOnly}
                />
                {hasError && (
                    <div className="alert alert-danger mx-validation-message" role="alert">
                        {validationFeedback}
                    </div>
                )}
            </div>
        </div>
    );
}
