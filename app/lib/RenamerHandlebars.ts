// class wrapping around handlebars env to implement custom renaming functions.
// this class provides function for renaming a list files into new names using
// the rename rule. it only renames the basename of the path, and drops the rest
// of the path before the basename.

import {create} from "handlebars"
import _ from "lodash";
import {v4 as uuid4} from "uuid";
import {extname,parse,ParsedPath} from "path";

export class RenamerHandlebars
{
    handleBarsEnv:typeof Handlebars

    firstIncCall:boolean
    incCounter:number

    currentFilename:string

    constructor()
    {
        this.handleBarsEnv=create();
        this.firstIncCall=true;
        this.incCounter=0;
        this.currentFilename="";

        // inserts a number that increases each time this func is used
        // can use startPos to set the 1st number, but does nothing
        // after the 1st number.
        this.handleBarsEnv.registerHelper("inc",(startPos:number|Object):number=>{
            var startPos2:number=1;

            if (_.isNumber(startPos))
            {
                startPos2=startPos;
            }

            if (this.firstIncCall)
            {
                this.incCounter=startPos2-1;
            }

            this.firstIncCall=false;

            this.incCounter++;
            return this.incCounter;
        });

        // inserts random hash
        this.handleBarsEnv.registerHelper("random",():string=>{
            return uuid4().slice(0,7);
        });

        // inserts original filename
        this.handleBarsEnv.registerHelper("filename",():string=>{
            return this.currentFilename;
        });
    }

    /** reset the persistent vars used during each compilation call */
    resetVars():void
    {
        this.firstIncCall=true;
        this.incCounter=0;
        this.currentFilename="";
    }

    /** apply the rule to list of filepaths */
    compileRule(filepaths:string[],rule:string):string[]
    {
        this.resetVars();

        const renamerTemplate:HandlebarsTemplateDelegate<{}>=this.handleBarsEnv.compile(rule);

        return _.map(filepaths,(filepath:string):string=>{
            const parsed:ParsedPath=parse(filepath);

            const extension:string=parsed.ext;
            this.currentFilename=parsed.name;

            return `${renamerTemplate({})}${extension}`;
        });
    }
}