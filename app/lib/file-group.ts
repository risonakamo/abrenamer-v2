// funcs for operating on file group related data structs

import _ from "lodash";

/** flatten grouped paths into flat list of paths */
export function flattenGroupedPaths(groups:GroupedPaths):string[]
{
    return _.flatMap(groups,(group:string[]):string[]=>{
        return group;
    });
}