# FROM arm32v7/debian:jessie-slim 
FROM python:buster

# most of this docker file is from https://github.com/protik77/python3-sensehat

RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y \
    ca-certificates \
    curl \
    python3-numpy \
    python3-pil \
    python3-pip \
    python-dev \
    cmake \
    qt4-default

RUN apt-get install -y libfontconfig1-dev libfreetype6-dev libx11-dev libxext-dev libxfixes-dev libxi-dev libxrender-dev libxcb1-dev libx11-xcb-dev libxcb-glx0-dev libxcb-keysyms1-dev libxcb-image0-dev libxcb-shm0-dev libxcb-icccm4-dev libxcb-sync0-dev libxcb-xfixes0-dev libxcb-shape0-dev libxcb-randr0-dev libxcb-render-util0-dev

# do all the installation in /tmp directory
WORKDIR /tmp

# set the version using a variable
ARG RTIMULIB_VERSION=7.2.1-3

# get all th required libraries
RUN curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/librtimulib-dev_${RTIMULIB_VERSION}_armhf.deb \
 && curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/librtimulib-utils_${RTIMULIB_VERSION}_armhf.deb \
 && curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/librtimulib7_${RTIMULIB_VERSION}_armhf.deb \
 && curl -LO https://archive.raspberrypi.org/debian/pool/main/r/rtimulib/python3-rtimulib_${RTIMULIB_VERSION}_armhf.deb \
 && curl -LO https://archive.raspberrypi.org/debian/pool/main/p/python-sense-hat/python3-sense-hat_2.2.0-1_armhf.deb

# install the required libraries
RUN dpkg -i \
    librtimulib-dev_${RTIMULIB_VERSION}_armhf.deb \
    librtimulib-utils_${RTIMULIB_VERSION}_armhf.deb \
    librtimulib7_${RTIMULIB_VERSION}_armhf.deb \
    python3-rtimulib_${RTIMULIB_VERSION}_armhf.deb \
    python3-sense-hat_2.2.0-1_armhf.deb

# cleanups
RUN rm -f /tmp/*.deb \
   && apt-get clean \ 
   && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/RPi-Distro/RTIMULib.git && cd RTIMULib/Linux/ && mkdir build && cd build && cmake .. && make

COPY . /app
WORKDIR /app

# RUN pip3 install --upgrade setuptools
# RUN pip3 install Flask 
RUN pip3 install -r requirements.txt 
EXPOSE 80
ENTRYPOINT [ "python3" ] 
CMD [ "ReportSite.py" ]