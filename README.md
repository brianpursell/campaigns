## INSTALL MONGODB AND NODE
You'll need them both, if you don't have them already.
https://docs.mongodb.com/manual/installation/
https://nodejs.org/en/

## INSTALL DEPENDENCIES
From project root run `npm i`. This will install dependencies for the csv_api as well.

## QUICK START
In the terminal run `npm run quick-start`.
This will start MongoDB, csv_api server, node server, and webpack-dev-server. It will also seed the database. Keep in mind if you restart the node server, changes will not persist. The database is wiped and re-seeded on each start.

## CSV API
This api parses the csv file provided with the challenge. It will also parse additional user csv files that are posted to `http://localhost:3030/users_csv`. However, error handling is limited, so the csv file would have to be formatted the same as the original.

## USERS
You are able to login as any user provided in the csv. The username will be the word `user` concatenated with the `user_id` from the csv file (e.g., if `user_id` === `1` then the username will be `user1`). The password defaults to `1234` for each user.

## ADMIN
You can login as `admin` to edit the campaign priority. Password is `1234`. Keep in mind, priorities are reset after server is restarted.
