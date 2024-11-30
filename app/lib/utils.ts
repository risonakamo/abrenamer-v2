// random util functions

import {exec} from "child_process";
import {normalize} from "path";

/** return string form of a number padded to 2 digits */
function padNumber(value:number):string
{
    return value.toString().padStart(2,"0");
}

/** custom date format function */
export function formatDate(date:Date):string
{
    return `${date.getFullYear()}/${padNumber(date.getMonth()+1)}/${padNumber(date.getDate())} `
        +`${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
}

/** open file explorer on the given path */
export function openFileExplorer(path:string):void
{
    exec(`explorer ${normalize(path)}`);
}