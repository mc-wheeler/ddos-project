DDOS Demo Website

Group 6 Members
Jackson Kueny
Carson Whitfield
Matthew Wheeler

Relevant Links
  Project Link: http://csci331vm.cs.montana.edu:3079/
  Github Link: https://github.com/mc-wheeler/ddos-project
  Presentation Link: 

Features
	Chart that tracks SYN packets
	Demo of SYN flood DDOS attack
  Togglable rate limiting 


Objective
The objective of this project was to provide an in-depth education on Distributed Denial of Service (DDoS) attacks. Detailing their mechanisms, risks, and consequences for online services. This project also aims to educate participants on effective defense strategies such as web application filtering, rate limiting, and using content delivery networks (CDNs). For our site, our goal was to create a website that could graph the activity of a live SYN flood program to showcase the execution of a DDoS attack. 

Tech Summary
For the backend, Express is used as the core web framework. Express-rate-limit is used to apply rate-limiting functionality, limiting the number of requests a client can make to the server within a specified time window. The path module is used to resolve file paths, allowing the server to serve static files. The server has middleware to enable or disable rate limiting dynamically and also includes functionality to simulate an attack state. Additionally, it includes endpoints to toggle both the rate limiting and attack states. This setup provides an environment for experimenting with rate limiting and simulating attack-like conditions on a web server.

On the frontend, an HTML page creates a user interface for visualizing SYN flood activity and controlling rate limiting and attack simulation on a server. The page uses Chart.js, to dynamically display a line chart that tracks SYN packet counts and rate limit rejections over time. It includes two buttons: one to toggle the attack state and another to enable or disable rate limiting. The chart updates every second by fetching packet count data from the server and adjusting the graph based on whether the attack is active and if rate limiting is in place. This allows for real-time monitoring and control of the simulated SYN flood activity.

The scapysyn.py script uses several key libraries to simulate a SYN flood attack and serve packet count data via a simple web server. The Scapy library is used to create and send crafted SYN packets to a target IP and port. The Flask framework is used to set up a web server that serves an HTML page and provides an API endpoint to return the current packet count during the attack. The script uses threading to run the SYN flood attack in the background, allowing the web server to continue serving requests. IPv4Address and getrandbits are used to generate random source IP addresses and TCP ports, simulating a distributed denial-of-service (DDoS) attack. The packet count is tracked globally and can be accessed through the Flask API, providing real-time data on the number of packets sent. This script combines network-level packet crafting with a web server to visualize the attack's progress.


Responsibilities
Jackson Kueny: Jackson developed the SYN flood program and successfully hosted the site on the school server.
Carson Whitfield: Carson created the server.js file, got the site to a functioning state, and created the presentation.
Matthew Wheeler: Matthew researched the means of implementation, created the index.html file, and the documentation. 


Conclusion
This project successfully integrates multiple technologies, including Express, Chart.js, Scapy, and Flask, to simulate and visualize a SYN flood attack along with the management of rate limiting. The combination of a backend server with real-time data and a frontend interface provides a clear and interactive way to observe how a SYN flood attack affects network performance with dynamic updates of packet counts and rate-limiting status. The use of random integers to simulate packet data was an effective workaround to ensure the safety of the demo, as creating a true attack scenario could have posed significant risks such as getting our devices blacklisted from the school server. While it's disappointing that the demonstration couldn't involve a real-world attack, our approach is still an effective showcase of the concepts of packet flooding and rate-limiting in a controlled and secure manner while also creating all the tools necessary for a true demonstration if it could be done safely.


References
Web Application Firewall (WAF) - https://www.a10networks.com/glossary/what-is-a-web-application-firewall-waf/
Content Delivery Network (CDN) - https://cloudkul.com/blog/what-is-content-delivery-network/
Implement IP Whitelisting/Blacklisting - https://nordlayer.com/blog/ip-whitelisting-for-cloud-security/
Regular Security Updates - https://www.linkedin.com/pulse/5-reasons-you-should-always-say-yes-software-update-michael-d-moore
Monitor and Alert Systems - https://www.pcmag.com/picks/the-best-website-monitoring-services
