#!/bin/bash

#turn on bash's job control
set -m
  
# Start the primary process and put it in the background
node . &
  
# Start the helper process
python3 ./lib/get_sense_data.py
  
# the my_helper_process might need to know how to wait on the
# primary process to start before it does its work and returns
  
  
# now we bring the primary process back into the foreground
# and leave it there
fg %1