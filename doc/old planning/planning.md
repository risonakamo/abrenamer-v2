# original features
- image tile dragging ui
    - quickly form groups by dragging and selecting
- based around idea of both renaming selected items and forming them into groups

## problems
- very annoying to set rename rules, so it was rarely done
    - had to select all the groups to set a rule
- could only rename images
- when performing grouping, it was sometimes slow to find the correct group to place items in. had to scroll around to find the correct group
    - how does XM viewer do this better? i don't think it really does anything better other than being faster overall

# aren features
- easily assign rename rules to target items
- able to rename any files and even folders

## problems
- no grouping functions. only renamed items after they had been grouped
- missing some rename rules such as random hash

# target improvements
- revamp "rename phase"
    - provide a menu of available rename rules to select from. create extensible system to add more rules
        - maybe through a config file. ideally in the UI, but maybe not initially
            - watch out for this though, as sometimes want weird rules like everything is a number, but have letter A at the end. so maybe just have a list of templates, but overall the rename rule is still a text based system. menu improves in aspect of allowing user to not have to remember how the renaming rules work
    - allow for setting just 1 rule that will apply to all groups. it was interesting to be able to rename each individual group, but this turns out to be never really used because its hard to tell what's in the group, and sometimes want more customisation, so that can just be done in the file explorer
        - instead, just pick 1 rule for groups and 1 rule for inside the group (usually just incrementing numbers)
- in "grouping phase", main focuses:
    - ability to handle any type of file. if file is not an image, can't render a preview, but should still allow it to be dragged around. maybe preview opens the file with default program
    - navigating groups was an issue sometimes. maybe could have a "minimap" mode or "group overview" mode to quickly find the target group
        - can click on group to go to it, or drag into it to place at end