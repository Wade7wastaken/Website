import os
import shutil
import minify_html
import json
import requests
import cssmin

shutil.rmtree('Output')

directory = "Website/"
try:
    os.mkdir("Output")
except FileExistsError:
    pass

for subdir, dirs, files in os.walk("./"):
    for file in files:
        f = os.path.normpath(os.path.join(subdir, file))

        # Check if the file starts with a .
        skip = False
        for folder in f.split(os.sep):
            if folder.startswith("."):
                skip = True
                break
        if skip:
            continue
        if os.path.splitext(f)[1] in ["", ".md", ".py"]:
            continue
        if "Output" in f:
            continue
        if "EmulatorJS" in f and not "data" in f:
            continue
        if "EmulatorJS" in f and "minify" in f:
            continue

        print("Processing: " + f)

        if os.path.splitext(f)[1] == ".html":
            with open(f, "rt", encoding="utf-8") as o:
                content = minify_html.minify(
                    o.read(), do_not_minify_doctype=True, ensure_spec_compliant_unquoted_attribute_values=True, minify_css=True, minify_js=True)

                outpath = os.path.join("Output", f)
                os.makedirs(os.path.dirname(outpath), exist_ok=True)
                with open(outpath, "wt", encoding="utf-8") as output:
                    output.write(content)
        elif os.path.splitext(f)[1] == ".json":
            with open(f, "rt", encoding="utf-8") as o:
                content = json.dumps(json.loads(o.read()),
                                     separators=(',', ':'))

                outpath = os.path.join("Output", f)
                os.makedirs(os.path.dirname(outpath), exist_ok=True)
                with open(outpath, "wt", encoding="utf-8") as output:
                    output.write(content)
        elif os.path.splitext(f)[1] == ".js":
            with open(f, "rt", encoding="utf-8") as o:
                content = requests.post("https://www.toptal.com/developers/javascript-minifier/api/raw", data={
                    "input": o.read()
                }).text

                outpath = os.path.join("Output", f)
                os.makedirs(os.path.dirname(outpath), exist_ok=True)
                with open(outpath, "wt", encoding="utf-8") as output:
                    output.write(content)
        elif os.path.splitext(f)[1] == ".css":
            with open(f, "rt", encoding="utf-8") as o:
                content = cssmin.cssmin(o.read())

                outpath = os.path.join("Output", f)
                os.makedirs(os.path.dirname(outpath), exist_ok=True)
                with open(outpath, "wt", encoding="utf-8") as output:
                    output.write(content)
        else:
            with open(f, "rb") as o:
                content = o.read()

                outpath = os.path.join("Output", f)
                os.makedirs(os.path.dirname(outpath), exist_ok=True)
                with open(outpath, "wb") as output:
                    output.write(content)
