const db = require("../db/connection");
const keys = require("../db/keys");

const reduceProperties = require("../utils/reduce-properties");

const reducecritics = reduceProperties("review_id", {
  critic_id: ["critics", null, "critic_id"],
  preferred_name: ["critics", null, "preferred_name"],
  surname: ["critics", null, "surname"],
  organization: ["critics", null, "orginization"],
  show_created: ["critics", null, "created_at"],
  show_updated: ["critics", null, "updated_at"],
});


async function destroy(reviewId) {
  // TODO: Write your code here
  
}

async function list(movie_id) {
  // TODO: Write your code here
  return db("reviews as r")
    .select("*")
    .where({ "r.movie_id": movie_id });
}

async function read(reviewId) {
  // TODO: Write your code here
  
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
