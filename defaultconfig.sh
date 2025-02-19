clear
apt-get update -y
apt-get install gnupg curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 23
nvm current
npm -v
source ~/.bashrc
npm install -g genieacs@1.2.13
useradd --system --no-create-home --user-group genieacs
mkdir -p /opt/genieacs/ext
mkdir /var/log/genieacs
node -e "console.log(\"GENIEACS_UI_JWT_SECRET=\" + require('crypto').randomBytes(128).toString('hex'))" >> /opt/genieacs/genieacs.env
chown genieacs:genieacs /opt/genieacs/ext
chown genieacs:genieacs /var/log/genieacs
chown genieacs:genieacs /opt/genieacs/genieacs.env
chmod 600 /opt/genieacs/genieacs.env
NODE_PATH=$(realpath $(dirname $(nvm which current))/../bin) 
ln -s $NODE_PATH/node /usr/bin/node
printf "[Unit]\nDescription=GenieACS CWMP\nAfter=network.target\n\n" > /etc/systemd/system/genieacs-cwmp.service
printf "[Service]\nUser=genieacs\nEnvironmentFile=/opt/genieacs/genieacs.env\nExecStart=$NODE_PATH/genieacs-cwmp\n\n" >> /etc/systemd/system/genieacs-cwmp.service
printf "[Install]\nWantedBy=default.target" >> /etc/systemd/system/genieacs-cwmp.service
printf "[Unit]\nDescription=GenieACS NBI\nAfter=network.target\n\n" > /etc/systemd/system/genieacs-nbi.service
printf "[Service]\nUser=genieacs\nEnvironmentFile=/opt/genieacs/genieacs.env\nExecStart=$NODE_PATH/genieacs-nbi\n\n" >> /etc/systemd/system/genieacs-nbi.service
printf "[Install]\nWantedBy=default.target" >> /etc/systemd/system/genieacs-nbi.service
printf "[Unit]\nDescription=GenieACS UI\nAfter=network.target\n\n" > /etc/systemd/system/genieacs-ui.service
printf "[Service]\nUser=genieacs\nEnvironmentFile=/opt/genieacs/genieacs.env\nExecStart=$NODE_PATH/genieacs-ui\n\n" >> /etc/systemd/system/genieacs-ui.service
printf "[Install]\nWantedBy=default.target" >> /etc/systemd/system/genieacs-ui.service
printf "[Unit]\nDescription=GenieACS FS\nAfter=network.target\n\n" > /etc/systemd/system/genieacs-fs.service
printf "[Service]\nUser=genieacs\nEnvironmentFile=/opt/genieacs/genieacs.env\nExecStart=$NODE_PATH/genieacs-fs\n\n" >> /etc/systemd/system/genieacs-fs.service
printf "[Install]\nWantedBy=default.target" >> /etc/systemd/system/genieacs-fs.service
printf "[Unit]\nDescription=GenieACS EXT\nAfter=network.target\n\n" > /etc/systemd/system/genieacs-ext.service
printf "[Service]\nUser=genieacs\nEnvironmentFile=/opt/genieacs/genieacs.env\nExecStart=$NODE_PATH/genieacs-ext\n\n" >> /etc/systemd/system/genieacs-ext.service
printf "[Install]\nWantedBy=default.target" >> /etc/systemd/system/genieacs-ext.service
printf "/var/log/genieacs/*.log /var/log/genieacs/*.yaml {\n    daily\n    rotate 30\n    compress\n    delaycompress\n    dateext\n}" > /etc/logrotate.d/genieacs
systemctl enable genieacs-ui
systemctl enable genieacs-nbi
systemctl enable genieacs-cwmp
systemctl enable genieacs-fs
systemctl daemon-reload
curl -fsSL https://www.mongodb.org/static/pgp/server-4.2.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-4.2.gpg \
   --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-4.2.gpg ] http://repo.mongodb.org/apt/debian buster/mongodb-org/4.2 main" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
apt-get update
apt-get install -y mongodb-org
systemctl enable mongod
systemctl daemon-reload
systemctl start mongod
systemctl start genieacs-ui
systemctl start genieacs-nbi
systemctl start genieacs-cwmp
systemctl start genieacs-fs