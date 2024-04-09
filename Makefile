lint-frontend:
	make -C frontend lint

install:
	npm ci & make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npm run start

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend

develop:
	make start-backend & make start-frontend

build:
	npm run build