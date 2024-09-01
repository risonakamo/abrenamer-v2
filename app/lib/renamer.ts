// renamer lib funcs

import {basename} from "path";

function renameGroupedItems(
    items:GroupedPaths,
    groupRenameRule:string,
    itemRenameRule:string,
    outputDir:string,
    renameMode:RenameMode,
):void
{

}

/** applies rename rule to the base of a path, producing a new basename. if give a path that
 *  is not a basename, will take the base name only. */
function applyRenameRule(
    filepath:string,
    renameRule:string,
):string
{
    filepath=basename(filepath);
}