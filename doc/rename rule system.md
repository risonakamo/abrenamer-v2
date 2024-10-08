# Rename Rule System
Users must provide a valid **Rename Rule** to determine how the selected items and groups are renamed.

Rename Rules are text strings. All items (or groups) file names will be changed to this text string.

Normally, this would result in all the new renamed files having the same name, which is not valid. **Rename Rule Functions** are available to insert dynamic pieces into the Rename Rule.

Additionally, **the original file extension of the target to be renamed is always preserved**.

# Rename Functions
## Increment Number
```
{{inc <startPos:int>}}
```

Inserts an incrementing number starting at `startPos`

Example: `{{inc 1}}`, `{{inc 5}}`

Defaults to 1 if `startPos` not provided.

!!! caution "Note"
    Currently does not support multiple `incs` in one rename rule. Each `inc` will increment within the same rule twice and be 2 separate numbers.

## Random Hash
```
{{random}}
```

Inserts random hash string. Each use in the same rule will be a different hash.

## Filename
```
{{filename}}
```

Inserts original filename.

## Not Yet Implemented
### Extension
```
{{ext}}
```

Inserts the original file's extension (without the dot). When this is used, the file extension is no longer added at the end of the renamed file automatically.

### No Extension
```
{{noExt}}
```

When set anywhere in the Rule, no automatic extension is added.