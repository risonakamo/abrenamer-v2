import {test} from "vitest";

import {RenamerHandlebars} from "@/lib//RenamerHandlebars";
import {renameGroupedItems} from "@/lib/renamer";

interface RenameGroupedItemsTest
{
    items:string[][]
    groupRule:string
    itemRule:string
}

test("using RenamerHandlebars class",()=>{
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
});

test("main rename grouped items func",()=>{

});