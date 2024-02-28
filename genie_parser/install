#!/bin/bash
mkdir -p /opt/genieacs/genie_parser
curl -o /opt/genieacs/genie_parser/index.js https://raw.githubusercontent.com/phtomic/genieacs/main/genie_parser/index.js
curl -o /opt/genieacs/genie_parser/package.json https://raw.githubusercontent.com/phtomic/genieacs/main/genie_parser/package.json
curl -o /opt/genieacs/genie_parser/ecosystem.config.js https://raw.githubusercontent.com/phtomic/genieacs/main/genie_parser/ecosystem.config.js
npm install -g pm2
cd /opt/genieacs/genie_parser
npm install
pm2 start ecosystem.config.js
pm2 save