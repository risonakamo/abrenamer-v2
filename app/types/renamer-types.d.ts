// types for renamer lib

/** list of lists of full paths. each 1st level group will become a folder based on
 *  the group rename rule */
type GroupedPaths=string[][]

/** possible rename action modes */
type RenameMode="move"|"copy"