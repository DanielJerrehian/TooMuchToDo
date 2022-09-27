# Backend

## To start the production server on the EC2 instance
- Run the command:
```
gunicorn 'src.app:create_app("production")' -b 0.0.0.0:7140
```

## Running the backend on Docker
- To start the container, enter the following command in the terminal:
```
docker run -p 7140:7140 -d toomuchtodo-api
```
- To stop the container, enter the following command in the terminal:
```
docker stop 31acd9a5a5f739482ccf022d7ce39572d54880dc94a51f49a00d273c6e066c68
```


## Database Migrations:
- In the terminal, run:
```py
    flask db migrate --directory src/models/migrations --message "enter your message here"
    flask db upgrade --directory src/models/migrations
```