// types for api purposes only

/** request to do rename */
interface RenameRequest
{
    items:GroupedPaths
    groupRenameRule:string
    itemRenameRule:string
    outputDir:string
    renameMode:RenameMode
}

/** result of rename request operation */
interface RenameRequestStatus
{
    status:"success"|"error"
    description:string
}