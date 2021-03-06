if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

DATABASE_URL = "mongodb+srv://" + process.env.DB_USERNAME + ":" +
 encodeURIComponent(process.env.DB_PASSWORD) + "@" + process.env.DB_CLUSTER + ".mongodb.net/urlxs?retryWrites=true&w=majority";

BASE_URL = process.env.BASE_HOST;

module.exports = {
  DATABASE_URL,
  BASE_URL
};
