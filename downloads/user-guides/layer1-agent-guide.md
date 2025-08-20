# Layer1Agent User Guide
## Cisco AI Network Monitoring Agent v1.0

### Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [API Reference](#api-reference)
7. [Troubleshooting](#troubleshooting)
8. [Support](#support)

---

## Introduction

The Layer1Agent is an AI-powered network monitoring agent specialized in physical layer troubleshooting, including optics monitoring, DOM/BER analysis, link flapping detection, and physical diagnostics.

### Key Features
- Real-time optical transceiver monitoring
- Digital Optical Monitoring (DOM) analysis
- Bit Error Rate (BER) tracking
- Link flap detection and correlation
- Predictive failure analysis
- Automated remediation suggestions

### Use Cases
- Proactive optical failure detection
- Link quality monitoring
- Physical layer troubleshooting
- Capacity planning
- Preventive maintenance

---

## Prerequisites

### System Requirements
- Kubernetes 1.19+
- Helm 3.0+
- Docker or containerd runtime
- Minimum 2 CPU cores
- 4GB RAM
- 10GB storage

### Network Requirements
- Access to monitored network devices
- SNMP v2c/v3 enabled on target devices
- gNMI telemetry (optional but recommended)
- Outbound HTTPS (443) to Cisco AI cloud

### Supported Platforms
- Cisco NCS 540/560/5000 series
- Cisco ASR 9000 series
- Cisco 8000 series
- Cisco Nexus 9000 series

---

## Installation

### Step 1: Load Container Image

```bash
# Load the container image
docker load < layer1-agent-v1.0.tar.gz

# Verify the image is loaded
docker images | grep layer1-agent
```

### Step 2: Configure Values

Create a `values-override.yaml` file:

```yaml
config:
  apiKey: "your-api-key-here"
  monitoring:
    enabled: true
    interval: 30s
  
  interfaces:
    - name: "Ethernet1/1"
      enabled: true
      ipAddress: "10.0.0.1"
    - name: "Ethernet1/2"
      enabled: true
      ipAddress: "10.0.0.2"

secrets:
  snmpCommunity: "your-community-string"
```

### Step 3: Deploy with Helm

```bash
# Create namespace
kubectl create namespace cisco-ai-agents

# Install the agent
helm install layer1-agent ./layer1-agent-chart.tgz \
  --namespace cisco-ai-agents \
  --values values-override.yaml

# Verify deployment
kubectl get pods -n cisco-ai-agents
kubectl logs -n cisco-ai-agents -l app=layer1-agent
```

---

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_KEY` | Cisco AI API key | Required |
| `LOG_LEVEL` | Logging level (debug/info/warn/error) | info |
| `API_ENDPOINT` | Cisco AI API endpoint | https://api.ciscoai.com |
| `SNMP_COMMUNITY` | SNMP community string | public |
| `POLLING_INTERVAL` | Monitoring interval | 30s |

### Optical Thresholds

```yaml
optics:
  domPolling: true
  thresholds:
    rxPower:
      min: -30  # dBm
      max: 0    # dBm
    txPower:
      min: -5   # dBm
      max: 5    # dBm
    temperature:
      min: 0    # Celsius
      max: 70   # Celsius
    berThreshold: 1e-6
```

### Device Configuration

Add devices to monitor:

```yaml
devices:
  - hostname: router1.example.com
    ip: 10.1.1.1
    snmpVersion: v3
    snmpUser: admin
    interfaces:
      - "TenGigE0/0/0/0"
      - "TenGigE0/0/0/1"
  
  - hostname: switch1.example.com
    ip: 10.1.1.2
    snmpVersion: v2c
    snmpCommunity: public
    interfaces:
      - "Ethernet1/1"
      - "Ethernet1/2"
```

---

## Usage

### CLI Commands

Access the agent CLI:

```bash
kubectl exec -it -n cisco-ai-agents layer1-agent-xxxxx -- /bin/sh
```

Available commands:

```bash
# Check agent status
layer1-agent status

# List monitored interfaces
layer1-agent interfaces list

# Get optical readings
layer1-agent optics show Ethernet1/1

# Force poll all interfaces
layer1-agent poll --all

# Export metrics
layer1-agent export --format json > metrics.json
```

### REST API Endpoints

The agent exposes REST APIs on port 8080:

```bash
# Health check
GET /health

# Ready check
GET /ready

# Metrics
GET /metrics

# Interface status
GET /api/v1/interfaces

# Optical data
GET /api/v1/optics/{interface}

# Trigger analysis
POST /api/v1/analyze
{
  "interface": "Ethernet1/1",
  "type": "full"
}
```

### Prometheus Metrics

The agent exports Prometheus metrics:

```
# Optical power metrics
layer1_rx_power_dbm{interface="eth1/1"} -15.2
layer1_tx_power_dbm{interface="eth1/1"} 2.1

# BER metrics
layer1_ber{interface="eth1/1"} 1.2e-9

# Link flap counter
layer1_link_flaps_total{interface="eth1/1"} 3

# Temperature
layer1_temperature_celsius{interface="eth1/1"} 45.5
```

---

## API Reference

### Authentication

All API calls require authentication:

```bash
curl -H "X-API-Key: your-api-key" \
  http://layer1-agent:8080/api/v1/interfaces
```

### Response Format

```json
{
  "status": "success",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "interfaces": [
      {
        "name": "Ethernet1/1",
        "status": "up",
        "optics": {
          "rxPower": -15.2,
          "txPower": 2.1,
          "temperature": 45.5,
          "ber": 1.2e-9
        },
        "alerts": []
      }
    ]
  }
}
```

---

## Troubleshooting

### Common Issues

#### Agent Not Starting

Check logs:
```bash
kubectl logs -n cisco-ai-agents layer1-agent-xxxxx
```

Common causes:
- Invalid API key
- Network connectivity issues
- Insufficient resources

#### No Data Collection

Verify SNMP connectivity:
```bash
snmpwalk -v2c -c public 10.1.1.1 system
```

Check agent configuration:
```bash
kubectl describe configmap -n cisco-ai-agents layer1-agent-config
```

#### High BER Readings

1. Check optical levels:
```bash
layer1-agent optics show --detailed
```

2. Verify fiber cleanliness
3. Check for bent cables
4. Review historical trends

### Debug Mode

Enable debug logging:

```yaml
config:
  logLevel: debug
  debug:
    saveRawData: true
    dumpInterval: 60s
```

### Performance Tuning

For large deployments:

```yaml
resources:
  limits:
    cpu: 2000m
    memory: 2Gi
  requests:
    cpu: 1000m
    memory: 1Gi

config:
  workers: 4
  batchSize: 100
  cacheTimeout: 300s
```

---

## Support

### Documentation
- User Guide: https://docs.ciscoai.com/agents/layer1
- API Reference: https://api.ciscoai.com/docs
- Knowledge Base: https://kb.ciscoai.com

### Contact
- Email: ai-support@cisco.com
- Slack: #cisco-ai-agents
- Support Portal: https://support.cisco.com

### License
Copyright © 2024 Cisco Systems, Inc. All rights reserved.

### Version History
- v1.0.0 - Initial release
  - Optical monitoring
  - BER analysis
  - Link flap detection
  - Basic alerting

### Roadmap
- v1.1.0 - ML-based predictive analytics
- v1.2.0 - Auto-remediation capabilities
- v2.0.0 - Multi-vendor support