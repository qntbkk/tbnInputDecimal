import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { TbninputdecimalContainerProps } from "../typings/TbninputdecimalProps";

import "./ui/Tbninputdecimal.css";

export function Tbninputdecimal({}: TbninputdecimalContainerProps): ReactElement {
    return <HelloWorldSample sampleText={"World"} />;
}
