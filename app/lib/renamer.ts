// renamer lib funcs

import _ from "lodash";

import {RenamerHandlebars} from "@/lib/RenamerHandlebars";

function renameGroupedItems(
    items:GroupedPaths,
    groupRenameRule:string,
    itemRenameRule:string,
    outputDir:string,
    renameMode:RenameMode,
):void
{

}

export function test_applyRenameRule():void
{
    const paths:string[]=[
        "a.png",
        "asdas.jpg",
        "huh",
        "something.txt",
        "something.jpg",
    ];

    const renamer:RenamerHandlebars=new RenamerHandlebars();

    var output:string[]=renamer.compileRule(
        paths,
        "{{inc 1}}",
    );

    console.log(output);

    output=renamer.compileRule(
        paths,
        "{{inc 12}}-{{random}}",
    );

    console.log(output);

    output=renamer.compileRule(
        paths,
        "{{random}} {{filename}}",
    );

    console.log(output);
}