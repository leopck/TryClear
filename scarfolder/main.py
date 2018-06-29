import os

# Change this variable accordingly
build_dir = "/media/rebeccas/clear-linux/clearlinux"
filename = "/media/rebeccas/work/10_trygit/3.txt"
filename2 = "/media/rebeccas/work/10_trygit/output.txt"

def recursive_folder(softdir):
    listap = [os.path.join(dp, f) for dp, dn, fn in os.walk(os.path.expanduser(softdir)) for f in fn]
    listbb = []
    listcc = []
    for x in listap:
        tmp = '"' + x[28:] +  '"'
        listbb.append(tmp)    
    return (','.join(listbb))

def parse_newline_escape(filename):
    fileContents = open(filename,"r").read()
    tmp = fileContents.replace('\"', '/\"')
    tmp = tmp.replace('\n', '\\n')
    # import pdb; pdb.set_trace()
    # f = open(filename2,"w")
    # f.write(tmp)
    # f.close()

def write_into_html(args):
    #check what number is the next html
    #write all contents into html and js
    #1.html, output_info_data_source.js, description_info.js

if __name__ == '__main__':
    print(recursive_folder(build_dir))
