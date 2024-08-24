new rename system plan

- renaming follows rename rule template string
- available templating functions:
    - incremental number
    - file extension
        - maybe this should be implicit? how often do i want the file extension to not be included? if choose to make implicit, how to disable if don't want the file extension?
            - lets do implicit for now until find a use case for it not being implicit
    - random hash
    - original filename

# ui layout
- dropdown box to select premade template
    - templates stored in config file (js to start with, yaml later)
- large text box for user to edit the template as needed
- large button to start renaming
- while renaming, lock all ui and show status. or just move to status screen

The above 2 elements compose a "rule selector component". User must pick **2 rules** - one for the groups, and one for inside the groups. So, the ui will have 2 rule selectors.

It was very rare to care about each individual group's renaming scheme, so keep it simple to just all groups, and each inner group has its own rule.

If want to specially rename a certain group's items, will just have to do that afterward.

# implementation
- rename ui page
- rename request to backend
- backend handles request