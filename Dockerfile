FROM ourtownrentals/git-deploy

ENV NODE_ENV production

EXPOSE 443

RUN mkdir -p /etc/puppetlabs/hiera

COPY index.js /usr/src/app/

VOLUME /srv

WORKDIR /usr/src/app

ENTRYPOINT ["npm"]

CMD ["start"]
