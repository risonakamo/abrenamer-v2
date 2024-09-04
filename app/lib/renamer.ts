// renamer lib funcs

import _ from "lodash";
import {join, normalize, dirname} from "path";
import {copySync, ensureDirSync, existsSync, removeSync} from "fs-extra";

import {RenamerHandlebars} from "@/lib/RenamerHandlebars";

/** main high level renamer func.
 *  renames grouped items using the group rule for groups and item rule for items. */
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




    // --- for each group, generating the item paths for items in the group
    const newItemPaths:string[][]=_.map(items,(innerItems:string[],itemsI:number):string[]=>{
        const groupPath:string=groupPaths[itemsI];

        // generate new item names with the renamer
        var newItemNames:string[]=renamer.compileRule(innerItems,itemRenameRule);

        // add group path to the new item name to make it into actual path.
        // also normalise
        newItemNames=_.map(newItemNames,(newItemName:string):string=>{
            return normalize(join(groupPath,newItemName));
        });

        // check for duplicates
        if (_.uniq(newItemNames).length!=newItemNames.length)
        {
            console.error("failed to rename items: duplicate item names generated");
            throw "duplicate item names";
        }

        return newItemNames;
    });




    // --- flattening and checking for duplicates
    const newItemPathsFlat:string[]=_.flatten(newItemPaths);

    if (_.uniq(newItemPathsFlat).length!=newItemPathsFlat.length)
    {
        console.error("duplicate paths detected in new paths");
        throw "duplicate paths";
    }

    const originalItemsFlat:string[]=_.flatten(items);


    // --- doing move
    multiMove(
        originalItemsFlat,
        newItemPathsFlat,
        renameMode=="copy"
    );
}

/** move or copy all selected items to items2 location. if any items2 already exist, the
 *  whole move/copy is aborted. ensures parent dir for all items2 */
function multiMove(items1:string[],items2:string[],copy:boolean):void
{
    if (items1.length!=items2.length)
    {
        console.error("length error, src/dest arrays were not same size");
        throw "size error";
    }

    // check all src items exist
    const items1Exists:boolean=_.every(items1,(item1:string):boolean=>{
        const exists:boolean=existsSync(item1);

        if (!exists)
        {
            console.error(item1,"did not exist to be moved/copied");
        }

        return exists;
    });

    if (!items1Exists)
    {
        console.error("a target item did not exist to be moved/copied");
        throw "not exist";
    }

    // check if any destination item would be overwritten
    const item2Exists:boolean=_.some(items2,(item2:string):boolean=>{
        const exists:boolean=existsSync(item2);

        if (exists)
        {
            console.error(item2,"already exists");
        }

        return exists;
    });

    if (item2Exists)
    {
        console.error("refusing to move/copy, a destination item already exists");
        throw "already exists";
    }

    var movingVerb:string="moving:";

    if (copy)
    {
        movingVerb="copying:";
    }

    for (let i=0;i<items1.length;i++)
    {
        const item1:string=items1[i];
        const item2:string=items2[i];

        ensureDirSync(dirname(item2));

        console.log(movingVerb,item1,"->",item2);
        copySync(item1,item2);
    }

    // if in move mode, delete the original items
    if (!copy)
    {
        for (let i=0;i<items1.length;i++)
        {
            const item1:string=items1[i];
            removeSync(item1);
        }
    }
}