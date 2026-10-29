#!/bin/bash
# Installs (if missing) and starts local PostgreSQL; data persists in /root/pgdata
set -e
PGBIN=$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | head -1)
if [ -z "$PGBIN" ]; then
  apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq postgresql
  PGBIN=$(ls -d /usr/lib/postgresql/*/bin | head -1)
fi
DATA=/root/pgdata
mkdir -p $DATA && chown -R postgres:postgres $DATA && chmod 700 $DATA
chmod 755 /root
if [ ! -f $DATA/PG_VERSION ]; then
  su postgres -c "$PGBIN/initdb -D $DATA" > /dev/null
fi
mkdir -p /var/run/postgresql && chown postgres:postgres /var/run/postgresql
su postgres -c "$PGBIN/pg_ctl -D $DATA -l $DATA/server.log status" > /dev/null 2>&1 || \
  su postgres -c "$PGBIN/pg_ctl -D $DATA -l $DATA/server.log -o '-c listen_addresses=localhost' start -w"
su postgres -c "psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='symstruo'\"" | grep -q 1 || \
  su postgres -c "psql -c \"CREATE USER symstruo WITH PASSWORD 'symstruo_pass'\""
su postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname='symstruo_db'\"" | grep -q 1 || \
  su postgres -c "psql -c \"CREATE DATABASE symstruo_db OWNER symstruo\""
echo "PostgreSQL ready"
