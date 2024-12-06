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

#### Using Build Scripts (Recommended)

1. Copy the appropriate template for your OS:
   ```bash
   # For Windows
   copy build.bat.template build.bat
   
   # For Linux/Mac
   cp build.sh.template build.sh
   chmod +x build.sh
   ```

2. Edit the copied file (`build.bat` or `build.sh`) and update the values with your Home Assistant configuration.

3. Run the build script:
   ```bash
   # For Windows
   build.bat
   
   # For Linux/Mac
   ./build.sh
   ```

#### Manual Build and Run

If you prefer to run the commands manually:

If you're rebuilding the container, first clean up existing containers and images:
```bash
docker stop ha-dashboard
docker rm ha-dashboard
docker rmi ha-dashboard
```

Then build and run:
```bash
# Build the Docker image with your configuration
docker build \
  --build-arg VITE_HA_URL=http://192.168.1.150 \
  --build-arg VITE_HA_PORT=8123 \
  --build-arg VITE_HA_TOKEN=your_long_lived_access_token \
  --build-arg DOCKER_HOST_IP=192.168.1.91 \
  -t ha-dashboard:latest .

# Run the container
docker run -d -p 3007:3007 --name ha-dashboard ha-dashboard:latest
```

> **Note**: 
> - Replace the example values with your actual Home Assistant URL, port, token, and host IP
> - All configuration is done at build time - you don't need to specify environment variables when running the container
> - The DOCKER_HOST_IP is optional and defaults to 'localhost' if not specified
> - Make sure to run these commands from your project directory where the Dockerfile is located

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

## Build Arguments Reference

| Argument | Description | Default | Required |
|----------|-------------|---------|----------|
| VITE_HA_URL | Your Home Assistant URL (e.g., http://192.168.1.150) | - | ✅ Yes |
| VITE_HA_PORT | Your Home Assistant port | 8123 | ✅ Yes |
| VITE_HA_TOKEN | Your Long-Lived Access Token | - | ✅ Yes |
| DOCKER_HOST_IP | Host IP for network access | localhost | ❌ No |

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
