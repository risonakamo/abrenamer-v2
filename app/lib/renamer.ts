// renamer lib funcs

import _ from "lodash";
import {join} from "path";

import {RenamerHandlebars} from "@/lib/RenamerHandlebars";

export function renameGroupedItems(
    items:GroupedPaths,
    groupRenameRule:string,
    itemRenameRule:string,
    outputDir:string,
    renameMode:RenameMode,
):void
{
    const renamer:RenamerHandlebars=new RenamerHandlebars();


    // --- generating names for groups
    var groupNames:string[]=_.map(items,(__:string[],groupI:number):string=>{
        return `${groupI+1}`;
    });

    groupNames=renamer.compileRule(groupNames,groupRenameRule);

    // convert group names into paths based on output path
    const groupPaths:string[]=_.map(groupNames,(groupName:string):string=>{
        return join(outputDir,groupName);
    });

    if (_.uniq(groupPaths).length<groupPaths.length)
    {
        console.error("failed to rename items: duplicate group names in rename result");
        console.error("group names:",groupNames);
        throw "duplicate group names";
    }

    if (groupPaths.length!=items.length)
    {
        console.error("generated group paths should match amount "
            +"of rename groups provided, but doesn't");
        console.error("group paths:",groupPaths);
        console.error("rename item groups:",items);
        throw "generated groups mismatch";
    }

    console.log(groupPaths);




    // --- for each group, generating the item paths for items in the group
    const newItemPaths:string[][]=_.map(items,(innerItems:string[],itemsI:number):string[]=>{
        const groupPath:string=groupPaths[itemsI];

        // generate new item names with the renamer
        var newItemNames:string[]=renamer.compileRule(innerItems,itemRenameRule);

        // add group path to the new item name to make it into actual path
        newItemNames=_.map(newItemNames,(newItemName:string):string=>{
            return join(groupPath,newItemName);
        });

        // check for duplicates
        if (_.uniq(newItemNames).length!=newItemNames.length)
        {
            console.error("failed to rename items: duplicate item names generated");
            throw "duplicate item names";
        }

        return newItemNames;
    });

    console.log(newItemPaths);
}