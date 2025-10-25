/**
 * This file was generated from Tbninputdecimal.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface TbninputdecimalContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    decimalAttribute: EditableValue<Big>;
    decimalPlaces: number;
    label: string;
    onChangeAction?: ActionValue;
}

export interface TbninputdecimalPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    decimalAttribute: string;
    decimalPlaces: number | null;
    label: string;
    onChangeAction: {} | null;
}
