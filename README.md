# Home Assistant Dashboard

A modern, responsive dashboard for Home Assistant built with React and Vite.

## Prerequisites

- Docker installed on your system
- A running Home Assistant instance
- A long-lived access token from Home Assistant

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/nickgardnermedia/hastatedashboard.git
cd hastatedashboard
```

2. Create a `.env` file from the template:
```bash
cp .env.template .env
```

3. Edit the `.env` file with your Home Assistant details:
```env
VITE_HA_URL=192.168.1.10        # Your Home Assistant IP (without http://)
VITE_HA_PORT=8123               # Your Home Assistant port
VITE_HA_TOKEN=your_token_here   # Your long-lived access token
```

4. Build and run with Docker:
```bash
# Build the image
docker build -t ha-dashboard \
  --build-arg VITE_HA_URL="192.168.1.10" \
  --build-arg VITE_HA_PORT="8123" \
  --build-arg VITE_HA_TOKEN="your_token_here" \
  .

# Run the container
docker run -d \
  --network host \
  -e HOME_ASSISTANT_URL="192.168.1.10" \
  -e HOME_ASSISTANT_PORT="8123" \
  -e VITE_HA_TOKEN="your_token_here" \
  --name ha-dashboard \
  ha-dashboard:latest
```

The dashboard will be available at `http://localhost:3007`

## Development

For local development:

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The development server will be available at `http://localhost:3007`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_HA_URL | Home Assistant IP/hostname (without http://) | 192.168.1.10 |
| VITE_HA_PORT | Home Assistant port | 8123 |
| VITE_HA_TOKEN | Long-lived access token | eyJ0... |

## Docker Configuration

The application runs in a Docker container with nginx serving the static files and proxying API requests to Home Assistant.

### Network Options

1. Host Network (recommended):
```bash
docker run -d \
  --network host \
  -e HOME_ASSISTANT_URL="192.168.1.10" \
  -e HOME_ASSISTANT_PORT="8123" \
  -e VITE_HA_TOKEN="your_token_here" \
  --name ha-dashboard \
  ha-dashboard:latest
```

2. Bridge Network (alternative):
```bash
docker run -d \
  -p 3007:3007 \
  -e HOME_ASSISTANT_URL="192.168.1.10" \
  -e HOME_ASSISTANT_PORT="8123" \
  -e VITE_HA_TOKEN="your_token_here" \
  --name ha-dashboard \
  ha-dashboard:latest
```

### Home Assistant Configuration

Ensure your Home Assistant instance is configured to accept requests from the dashboard. Add the following to your `configuration.yaml`:

```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 172.16.0.0/12
    - 192.168.0.0/16
```

## Troubleshooting

1. **Connection Refused**: Make sure Home Assistant is accessible at the specified IP and port
2. **Authentication Failed**: Verify your token is correct and hasn't expired
3. **Network Issues**: Try using the host network option if having connection problems

## License

MIT License - See LICENSE file for details
