import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { TbninputdecimalPreviewProps } from "../typings/TbninputdecimalProps";

export function preview({}: TbninputdecimalPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={"sampleText"} />;
}

export function getPreviewCss(): string {
    return require("./ui/Tbninputdecimal.css");
}
