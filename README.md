# Instructions on How to Run

To run in dev mode (nodemon for backend and nextjs dev server for frontend, changes to the code can be reflected in real-time):
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

To run in prod mode (“node index.js” to run the server for backend and nextjs standalone server for frontend):
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

docker-compose down -v
