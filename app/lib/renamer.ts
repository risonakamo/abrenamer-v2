// renamer lib funcs

import Handlebars,{create} from "handlebars";
import {basename,extname} from "path";
import _ from "lodash";
import {v4 as uuid4} from "uuid";

function renameGroupedItems(
    items:GroupedPaths,
    groupRenameRule:string,
    itemRenameRule:string,
    outputDir:string,
    renameMode:RenameMode,
):void
{

}

/** apply rename rule to list of file paths. only the basename is considered and produced, the
 *  rest of the filepath (before the basename) is not used. refer to rename rule system doc
 *  for how rename rule works */
function applyRenameRule(
    filepaths:string[],
    renameRule:string,
):string[]
{
    const renamerTemplate:HandlebarsTemplateDelegate<{}>=createRenamerEnv(renameRule);

    return _.map(filepaths,(filepath:string):string=>{
        const extension:string=extname(filepath);

        return `${renamerTemplate({})}${extension}`;
    });
}

/** creates handlebars template to perform renaming using given rename rule. refer to rename
 *  rule document for rename rule usage */
function createRenamerEnv(renamerRule:string):HandlebarsTemplateDelegate<{}>
{
    const handleBarsEnv:typeof Handlebars=create();

    var firstIncCall:boolean=true;
    var incCounter:number=0;

    // inserts a number that increases each time this func is used
    // can use startPos to set the 1st number, but does nothing
    // after the 1st number.
    handleBarsEnv.registerHelper("inc",(startPos:number|Object):number=>{
        var startPos2:number=1;

        if (_.isNumber(startPos))
        {
            startPos2=startPos;
        }

        if (firstIncCall)
        {
            incCounter=startPos2-1;
        }

        firstIncCall=false;

        incCounter++;
        return incCounter;
    });

    // inserts random hash
    handleBarsEnv.registerHelper("random",():string=>{
        return uuid4().slice(0,7);
    });

    // inserts original filename
    handleBarsEnv.registerHelper("filename",():string=>{

    });

    return handleBarsEnv.compile(renamerRule);
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

    var output:string[]=applyRenameRule(
        paths,
        "{{inc 1}}",
    );

    console.log(output);

    var output=applyRenameRule(
        paths,
        "{{inc 12}}-{{random}}",
    );

    console.log(output);
}