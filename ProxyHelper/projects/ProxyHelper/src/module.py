#!/usr/bin/env python3 
 
import logging 
 
from pineapple.modules import Module, Request 
 
module = Module('ProxyHelper', logging.DEBUG) 
 
@module.handles_action('hello_world') 
def hello_world(request: Request): 
    return 'Hello World' 
 
if __name__ == '__main__': 
    module.start()