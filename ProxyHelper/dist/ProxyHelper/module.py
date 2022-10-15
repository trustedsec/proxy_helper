#!/usr/bin/env python3 
 
import logging 
 
from pineapple.modules import Module, Request 
 
module = Module('ProxyHelper', logging.DEBUG) 
 
@module.handles_action('aboutInfo') 
def aboutInfo(request: Request): 
    return 'aboutInfoaaa' 
 
if __name__ == '__main__': 
    module.start()