# Orderin App (Point Of Sale)

## Installing App
clone the repository
open your terminal, type
```
cd orderin
npm install
run with
adonis serve --dev
```

## Database Configuration
open your .env file and setting like this
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=orderin
```

## Migration your database
```
adonis migration:run
```

## Running in your browser
```
127.0.0.1:3333
```

## Please register your account
```
127.0.0.1:3333/register
```
then login with your email and password

## Insert your product
then you can order it

#### Thanks, i hope you enjoy my app
__Note__: my app just for 1 user order