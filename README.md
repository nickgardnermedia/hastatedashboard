# Home Assistant Entities Lookup Dashboard

A clean, modern dashboard for viewing and managing Home Assistant entities. Built with React, TypeScript, and Tailwind CSS, this dashboard provides a user-friendly interface to monitor your Home Assistant entities.

## Features

- 🔍 Real-time entity status monitoring
- 🌓 Dark/Light theme support
- 🔄 Automatic data refresh
- 📱 Responsive design
- 🔍 Search functionality
- 📊 Clean, organized entity display
- 🔒 Secure API token authentication

## Prerequisites

Before you begin, ensure you have the following:

- Docker installed on your system
- Home Assistant instance running on your local network
- Home Assistant Long-Lived Access Token ([How to generate](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token))

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hastatedashboard.git
   cd hastatedashboard
   ```

2. Create a `.env` file with your Home Assistant configuration:
   ```env
   VITE_HA_URL=http://your.homeassistant.ip
   VITE_HA_PORT=8123
   VITE_HA_TOKEN=your_long_lived_access_token
   ```

3. Build and run with Docker:
   ```bash
   docker build -t ha-dashboard .
   docker run -d \
     -p 3007:3007 \
     -e HOME_ASSISTANT_URL=http://your.homeassistant.ip \
     -e HOME_ASSISTANT_PORT=8123 \
     -e HOME_ASSISTANT_TOKEN=your_long_lived_access_token \
     --name ha-dashboard \
     ha-dashboard
   ```

4. Access the dashboard at `http://localhost:3007`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| HOME_ASSISTANT_URL | Your Home Assistant URL (e.g., http://192.168.1.100) | - |
| HOME_ASSISTANT_PORT | Your Home Assistant port | 8123 |
| HOME_ASSISTANT_TOKEN | Your Long-Lived Access Token | - |

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
