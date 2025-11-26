#####################################################################
#                                                                   #
# DOCKERFILE                                                        #
# ----------                                                        #
#                                                                   #
# Purpose: Docker def for nova-api.                                 #
#                                                                   #
# Author:  ecodev admin <admin@ecodev.eco>                          #
#                                                                   #
# Date:    July 4th 2025                                            #
#                                                                   #
#####################################################################

FROM mariadb:lts-noble

ARG NOVA_API__AUTHOR
ARG NOVA_API__SQL__FILE
ARG NOVA_API__SQL__PATH

LABEL authors=${NOVA_API__AUTHOR}
COPY ${NOVA_API__SQL__PATH}/${NOVA_API__SQL__FILE} /docker-entrypoint-initdb.d

CMD ["mariadbd"]
