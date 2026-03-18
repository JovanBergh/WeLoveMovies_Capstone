const db = require("../db/connection");
const { reviews } = require("../db/keys");

const reduceProperties = require("../utils/reduce-properties");

const reduceCritics = reduceProperties("review_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
  created_at: ["critic", null, "created_at"],
  updated_at: ["critic", null, "updated_at"],
});

async function destroy(review_id) {
  return db("reviews").where({ review_id }).del();
  
}

async function list(movie_id) {
  return db("reviews as r")
    .select(reviews)
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritic))); //mapping critics to reviews
}

async function read(review_id) {
  return db("reviews as r").where({ review_id }).select(reviews).first();
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
