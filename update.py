import os
from datetime import datetime

root = "docs"
note_list = []
note_tree = {"name": "docs", "type": "dir", "children": []}
hash = {root: note_tree}


def check_dir(dirpath, dirname):
    if hash.get(dirpath, None) is None:
        note_dir = {"name": dirname, "type": "dir", "children": []}
        hash[dirpath] = note_dir


for dirpath, dirnames, filenames in os.walk(root):
    father = dirpath.split("/")[-1]
    check_dir(dirpath, father)
    for dirname in dirnames:
        check_dir(os.path.join(dirpath, dirname), dirname)
        hash[dirpath]["children"].append(hash[os.path.join(dirpath, dirname)])
    for filename in filenames:
        hash[dirpath]["children"].append(
            {
                "name": filename.replace(".md", ""),
                "type": "file",
                "time": datetime.fromtimestamp(
                    os.stat(os.path.join(dirpath, filename)).st_mtime
                ).strftime("%Y-%m-%d %H:%M:%S"),
            }
        )
        note_list.append(
            {
                "name": filename.replace(".md", ""),
                "href": "/" + os.path.join(dirpath, filename).replace("\\", "/"),
                "type": "file",
                "time": datetime.fromtimestamp(
                    os.stat(os.path.join(dirpath, filename)).st_mtime
                ).strftime("%Y-%m-%d %H:%M:%S"),
            }
        )

text = "// AUTO-CREATE\n"
text += f"const NOTES_TREE={str(note_tree)}\n"
text += f"const NOTES_LIST={str(note_list)}\n"

with open("indexes.js", "w", encoding="utf8") as fw:
    fw.write(text)
