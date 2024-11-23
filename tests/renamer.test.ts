import {test} from "vitest";
import {removeSync} from "fs-extra";

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
    removeSync("tests/test-items/dest");

    const renameItems:GroupedPaths=[
        [
            "tests/test-items/orig/thing1.txt",
            "tests/test-items/orig/inner-dir/thing3.txt"
        ],
        [
            "tests/test-items/orig/thing2.txt",
        ]
    ];

    renameGroupedItems(
        renameItems,
        "{{inc 1}}",
        "{{inc 1}}",
        "tests/test-items/dest",
        "copy",
    );
});