# Home Assistant Entity Dashboard

A modern, containerized React dashboard for Home Assistant entity management. Built with TypeScript and featuring real-time status updates, this lightweight dashboard provides a clean interface for monitoring your Home Assistant entities.

## Features

- 🔍 Real-time entity status monitoring
- 🌓 Dark/Light theme support
- 🔄 Automatic data refresh
- 📱 Responsive design
- 🔍 Search functionality
- 📊 Clean, organized entity display
- 🔒 Secure API token authentication

## Prerequisites

- Docker installed on your system (for containerized deployment)
- Home Assistant instance running on your local network
- Home Assistant Long-Lived Access Token ([How to generate](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token))
- Git installed on your system (if not, follow the instructions below)

### Installing Git

To install Git on your system, follow these steps:

- **Ubuntu/Debian**: `sudo apt-get install git`
- **Red Hat/Fedora/CentOS**: `sudo dnf install git`
- **Mac (with Homebrew)**: `brew install git`
- **Windows**: Download and install from the official Git website: https://git-scm.com/download/win

## Quick Start (Docker Deployment)

### Clone the Repository
```bash
git clone https://github.com/nickgardnermedia/hastatedashboard.git
cd hastatedashboard
```

### Build and Run with Docker
```bash
# Build the Docker image
docker build -t ha-dashboard .

# Run the container with your Home Assistant configuration
docker run -d \
  -p 3007:3007 \
  -e HOME_ASSISTANT_URL=http://192.168.1.150 \
  -e HOME_ASSISTANT_PORT=8123 \
  -e HOME_ASSISTANT_TOKEN=your_long_lived_access_token \
  --name ha-dashboard \
  ha-dashboard
```

### Access the Dashboard
Open your browser and navigate to `http://localhost:3007`

## Local Development

If you want to run the application locally without Docker for development:

1. Clone the repository as shown above

2. Create your environment file:
   ```bash
   # Copy the template file
   cp .env.template .env
   
   # Edit .env with your Home Assistant details:
   # - VITE_HA_URL: Your Home Assistant URL (e.g., http://192.168.1.150)
   # - VITE_HA_PORT: Your Home Assistant port (default: 8123)
   # - VITE_HA_TOKEN: Your Long-Lived Access Token
   ```

3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```

## Environment Setup

⚠️ **IMPORTANT**: This application requires a valid Home Assistant configuration to function. You **MUST** provide the following environment variables:

1. `HOME_ASSISTANT_URL`: The full URL of your Home Assistant instance
2. `HOME_ASSISTANT_PORT`: The port your Home Assistant is running on (typically 8123)
3. `HOME_ASSISTANT_TOKEN`: A Long-Lived Access Token from your Home Assistant instance

Without these properly configured, the application will not be able to connect to your Home Assistant instance and will not function correctly.

### Setting Up Environment Variables

1. Copy the `.env.template` file to create a new `.env` file:
   ```bash
   cp .env.template .env
   ```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| HOME_ASSISTANT_URL | Your Home Assistant URL (e.g., http://192.168.1.150) | - | ✅ Yes |
| HOME_ASSISTANT_PORT | Your Home Assistant port | 8123 | ✅ Yes |
| HOME_ASSISTANT_TOKEN | Your Long-Lived Access Token | - | ✅ Yes |

> **Note**: For Docker deployment, these variables are passed directly to the container using the `-e` flag. The `.env` file is only needed for local development.

### Obtaining a Long-Lived Access Token

1. Log in to your Home Assistant instance
2. Click on your profile name (bottom left)
3. Scroll to the bottom and create a Long-Lived Access Token
4. Copy this token immediately (it won't be shown again) and use it in your environment configuration

## Development

To run the application locally for development:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your configuration (see above)

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the development server at `http://localhost:5173`

## Building for Production

To build the application for production:

```bash
npm run build
```

## Security Considerations

- Never commit your `.env` file or expose your Home Assistant token
- Use HTTPS if exposing the dashboard outside your local network
- Keep your Home Assistant instance and this dashboard up to date

## Contributing

Contributions are welcome! This is an open source project meant to benefit the Home Assistant community. Please feel free to submit a Pull Request.

## License

This is open source software, freely available to the community.

## Acknowledgments

- Built with React, TypeScript, and Tailwind CSS
- Uses Home Assistant REST API
- Icons provided by Lucide React
