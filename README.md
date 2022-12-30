
# Super Technologies Attendance Portal

This Web Portal was developed at the end of September 2022 by the IT Team of (didx.net).
The idea behind this portal was to overcome the issue of supertec mobile app not having a support for (ios) devices, at that time attendance were registered inside an whatsapp group and at the end of the month HR would manually collect all the data from that group and generate a excel sheet out of it.
## Run Locally

Clone the project

```bash
  git clone https://github.com/erdum/didx_attendence_app.git
```

Go to the project directory

```bash
  cd my-project
```

Install all the dependencies and packages

```bash
  npm install
```

Create env file
```bash
  touch .env.local
```

## Configuration

1. Create a new project in firebase and enable google auth provider in the authentication section

2. Click on add web app in your firebae project console and copy api key and auth domain from config object for environment variable

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`VITE_FIREBASE_API_KEY=api_key_from_firebase_config`

`VITE_FIREBASE_AUTH_DOMAIN=auth_domain_from_firebase_config`

Start the development server

```bash
  npm run dev
```
## Deployment

To deploy this project we recommend platforms like [Vercel](https://vercel.com) but you can also deploy it manually

### Vercel Deployment

- Import your github repo into vercel project

- Follow the [configuration](#configuration) section

- Add environments variables to your project in the settings

### Manual Deployment

- Make sure that you have successfully run this application on your local machine before following this step

- `npm run build`

- `cd dist`

- Now you can upload the dist folder to the root directory of your server

- Don't forget to add .env.local file inside your server root directory

- Follow the [configuration](#configuration) section

- Add the same environments variables as described in the [Environment Variable](#environment-variable) section

## Copyright

All right reserved by Super Technologies inc