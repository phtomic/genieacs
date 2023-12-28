# GenieACS v1.2 Dockerfile #
############################
FROM node:18-slim
RUN npm install -g --unsafe-perm genieacs@1.2.9
RUN npm install pm2 -g
RUN useradd --system --no-create-home --user-group genieacs
RUN mkdir -p /var/log/genieacs
RUN chown genieacs:genieacs /var/log/genieacs
ADD genieacs.logrotate /etc/logrotate.d/genieacs
ADD genieacs /opt/base
ADD genieacs /genieacs
RUN ln -s /genieacs /opt/genieacs
RUN chown genieacs:genieacs /opt/genieacs/ext
ADD run_with_env.sh /usr/bin/run_with_env.sh
ADD entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/run_with_env.sh
RUN chmod +x /usr/bin/entrypoint.sh
WORKDIR /genieacs
EXPOSE 3000 7547 7557 7567 27017
CMD ["/usr/bin/entrypoint.sh"]