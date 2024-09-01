import {test} from "vitest";

import {compile,create} from "handlebars";
import Handlebars from "handlebars";
import _ from "lodash";

// test using handlebars
test("handle-bars",()=>{
    const handleBarsEnv:typeof Handlebars=create();

    var firstIncCall:boolean=true;
    var incCounter:number=0;

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

    const template:HandlebarsTemplateDelegate=handleBarsEnv.compile("{{test}}{{inc 2}}");
    var output:string=template({
        test:"hello"
    });

    console.log(output);

    var output:string=template({
        test:"hello"
    });

    console.log(output);
});