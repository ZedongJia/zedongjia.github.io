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

papers = [
    {"href": "https://github.com/ZedongJia/TrinityRCL", "title": "TrinityRCL 复现"},
    {
        "href": "https://github.com/ZedongJia/Empirical-Study-on-Multi-source-Failure-Diagnosis",
        "title": "参与的论文 Empirical-Study-on-Multi-source-Failure-Diagnosis",
    },
]
projects = [
    {
        "href": "https://github.com/ZedongJia/College-Helper",
        "title": "教育垂直领域，志愿填报知识图谱项目",
    },
    {
        "href": "https://github.com/ZedongJia/Subjects-of-the-Sun",
        "title": "基于vue的三星堆文化博物馆项目",
    },
    {"href": "https://github.com/ZedongJia/c-compiler", "title": "C语言代码编译器项目"},
]

text = "// AUTO-CREATE\n"
text += f"const NOTES_TREE={str(note_tree)}\n"
text += f"const NOTES_LIST={str(note_list)}\n"
text += f"const PAPERS={str(papers)}\n"
text += f"const PROJECTS={str(projects)}\n"

with open("indexes.js", "w", encoding="utf8") as fw:
    fw.write(text)
