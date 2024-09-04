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

test.only("main rename grouped items func",()=>{
    const paths:string[][]=[
        [
            "C:/Users/ngokn1/Desktop/rename-test/src/lamproad.jpg",
            "C:/Users/ngokn1/Desktop/rename-test/src/as",
        ],
        [
            "C:/Users/ngokn1/Desktop/rename-test/src/maldr.jpg",
            "C:/Users/ngokn1/Desktop/rename-test/src/mall.jpg",
        ]
    ];

    var groupRule:string="{{inc}}";
    var itemRule:string="{{inc}}";

    renameGroupedItems(
        paths,
        groupRule,
        itemRule,
        "C:/Users/ngokn1/Desktop/rename-test/output",
        "copy",
    );
});