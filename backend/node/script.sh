#!/bin/bash
# init-db.sh

echo "Waiting for MySQL to be ready..."

# set -e

# # Wait for MySQL to be ready
# host="$1"
# shift
# until MYSQL_PWD="$MYSQL_PASSWORD" mysql -h "$host" -u "$MYSQL_USER" -e 'SELECT 1'; do
#   >&2 echo "MySQL is unavailable - sleeping"
#   sleep 1
# done

# >&2 echo "MySQL is up - initializing database"

# # Run your Prisma commands
# npx prisma generate
# npx prisma migrate dev --name init
# npx prisma db seed

# # Continue with the main command
# exec "$@"
