# Proxy Helper

Proxy Helper is a WiFi Pineapple module that will automatically configure the Pineapple for IP forwarding and set up the necessary rules. This allows the user to easily forward web traffic to a proxy such as Burp Suite for inspection.

![Proxy Helper](../assets/images/proxy_helper.png?raw=true)

## Installation

Download the repo as a zip file and unzip the file **proxy_helper-master.zip** and copy the *ProxyHelper* folder to */pineapple/modules* on the Pineapple.

## Usage
### Pre MkVII
Check out the [blog post](https://www.trustedsec.com/blog/introducing-proxy-helper-a-new-wifi-pineapple-module) for detailed information on setup and usage.

### MkVII
With the Pineapple connected, `cd` into the `ProxyHelper` directory and run `./build.sh copy`, the follow on from `CONFIGURING BURP SUITE` in the above mentioned blog post.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
