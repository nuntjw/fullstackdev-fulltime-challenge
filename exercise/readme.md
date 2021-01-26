# Test Environment

Frontend: http://coin-locker-frontend.s3-website-ap-southeast-1.amazonaws.com/

Backend: http://54.179.213.175:8000

Swarmpit: http://54.179.213.175:888

# Devs Ops
- AWS EC2 for deploy backend
- AWS ECR to store docker image
- Swarmpit for deploy container via docker-swarm
- AWS S3 to serve frontend static website


# Next Tasks
- use github action for CI/CD process
- improve UI/UX on reservse modal
- unit test (jest), integration test (supertest) and system test (cypress)
# Running Peoject
## Backend (Nodejs, ExpressJs, Socket IO, MongoDB)

change directory to backend folder

```
cd exercise/backend
```

rename `.env.example` to `.env`

```
mv .env.example .env
```

running via docker-compose

```
docker-compose up
```

then backend will running at `localhost:8000`
## Frontend (VueJs, bootstrap, socket io client)

change directory to frontend folder

```
cd exercise/frontend
```

rename `.env.example` to `.env`

```
mv .env.example .env
```

edit your `SERVICE_URL` in your `.env` to point to backend url, for example

```
SERVICE_URL=http://192.168.0.1:8000
```

running via docker-compose

```
docker-compose up
```

then frontend will running at `localhost:3000`