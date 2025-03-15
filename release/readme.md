# Making release steps
1. Increment package.json version
2. Edit version.md with info
3. Edit gen-release.sh. Give it version info
4. `bash build-all.sh`
    - Can skip if pretty sure already built
5. `bash gen-release.sh`
6. Take zip file from `output` dir
7. git commit, tag, push
8. Make release on github and upload zip