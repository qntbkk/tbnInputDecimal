import { ReactElement, createElement } from "react";
import { TbninputdecimalPreviewProps } from "../typings/TbninputdecimalProps";

export function preview({}: TbninputdecimalPreviewProps): ReactElement {
    return <div></div>;
}

export function getPreviewCss(): string {
    return require("./ui/Tbninputdecimal.css");
}
