#Dockerfile for Goonstation

# Run debian:latest and fetch the latest updates
FROM debian:latest AS base
# Update and install packages
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        byond \
        build-essential \
        git \
        wget

# Download and install Byond
FROM base AS byond
WORKDIR /byond

FROM byond AS goonstation
