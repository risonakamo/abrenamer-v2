import {test} from "vitest";

import {RenamerHandlebars} from "@/lib//RenamerHandlebars";
import {renameGroupedItems} from "@/lib/renamer";

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
            "C:/Users/ktkm/Pictures/day road and bridge.png",
            "C:/Users/ktkm/Pictures/mall.jpg",
        ],
        [
            "C:/Users/ktkm/Desktop/thing",
            "C:/Users/ktkm/Desktop/somewhere/something.txt",
        ]
    ];

    var groupRule:string="{{inc}}";
    var itemRule:string="{{inc}}";

    renameGroupedItems(
        paths,
        groupRule,
        itemRule,
        "C:/Users/ktkm/Desktop/thing/out",
        "move",
    );
});