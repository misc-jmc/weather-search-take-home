# weather-search-take-home
## Stack:
- Next.js / React
    - MUI components
- WireGuard VPN (deployed via [wg-easy](https://github.com/wg-easy/wg-easy))


## Prerequisites:
- [WireGuard Tunnelling Client](https://www.wireguard.com/install/) to access the app when it's running behind VPN
- [Docker](https://docs.docker.com/get-docker/) to spin up the VPN and application
- [OpenWeatherAPI Key](https://openweathermap.org/) to authenticate API calls

## Running the Application
- Local development can be done by simply running `npm run dev`
  - Ensure you first run `npm i` if running in development mode locally.
  - Ensure at project root you provide a `.env.local` file with `API_KEY=[your key]`

- To run in production mode (including spinning up the VPN)
    - Navigate to `./compose.yml` and alter variables to match your needs (each update marked with ⚠️)
    - Run `docker compose up -d`
    - Create a VPN client
        - Navigate to http://0.0.0.0:51821
        - Sign in with your set Admin Password
        - Create a Client
        - Export the client config to your external client in order to test via VPN
        - Use the client config to connect your client to the server
    - Via your VPN client machine navigate to the docker container IP Address
    