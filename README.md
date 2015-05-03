#node-q-bnb

#setup
##node on ubuntu
sudo apt-get install nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
npm install -g grunt-cli

need to create app/q/env.q (not included in the repo)
*`.env.BNB: `$":host:port::"`

#run
From parent directory
* `grunt q` to launch q server
* `grunt node` to launch node server