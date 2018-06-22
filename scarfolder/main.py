import os

listap = [os.path.join(dp, f) for dp, dn, fn in os.walk(os.path.expanduser("/media/rebeccas/clear-linux/clearlinux/projects")) for f in fn]

for x in listap:
  listbb.append(x[28:])

print(*('"{}"'.format(item) for item in listbb), sep=',')
