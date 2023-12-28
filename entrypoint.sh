#!/bin/bash
if [ -z "$(ls -A /genieacs)" ]; then
   cp -r /opt/base/* /genieacs
   node -e "console.log(\"GENIEACS_UI_JWT_SECRET=\" + require('crypto').randomBytes(128).toString('hex'))" >> /genieacs/genieacs.env
fi

/usr/bin/run_with_env.sh /opt/genieacs/genieacs.env /usr/local/bin/genieacs-cwmp
/usr/bin/run_with_env.sh /opt/genieacs/genieacs.env /usr/local/bin/genieacs-ui
/usr/bin/run_with_env.sh /opt/genieacs/genieacs.env /usr/local/bin/genieacs-nbi
/usr/bin/run_with_env.sh /opt/genieacs/genieacs.env /usr/local/bin/genieacs-fs
echo "" >>/var/log/genieacs/empty

pm2 log