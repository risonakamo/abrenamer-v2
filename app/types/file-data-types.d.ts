// types dealing with file data representation. also used by frontend

/** file item data keyed by their path
 *  key: filepath
 *  val: the file item */
type FileItemDataDict=Record<string,FileItemData>

/** collection of fields consisting of the current file items data */
interface ItemsData
{
    fileItemsData:FileItemDataDict
    fileGroups:FileItemGroup[]
}

/** data of a file item */
interface FileItemData
{
    // full filepath
    filepath:string

    isImage:boolean

    filename:string
    filetype:string
}

/** group of file items */
interface FileItemGroup
{
    name:string
    // filepaths of items that are in the group
    items:string[]
}