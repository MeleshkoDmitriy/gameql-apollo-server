import db from "./_db.js";
import { constants } from "./constants.js";

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    likedGames() {
      return db.games.filter((game) => game.isAdminLiked === true);
    },
    users() {
      return db.users;
    },
    user(_, args) {
      return db.users.find((user) => user.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  User: {
    reviews(parent) {
      return db.reviews.filter((review) => parent.id === review.user_id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    user(parent) {
      return db.users.find((user) => user.id === parent.user_id);
    },
  },
  Mutation: {
    deleteReview(_, args) {
      db.reviews = db.reviews.filter((review) => review.id !== args.id);
      return db.reviews;
    },
    addReview(_, { review }) {
      const newId = (db.reviews.length > 0 ? Math.max(...db.reviews.map(r => r.id)) + 1 : 1);

      const newReview = {
        id: newId,
        game_id: review.gameId,
        user_id: constants.adminId,
        content: review.content,
        rating: review.rating,
      };

      db.reviews.push(newReview);

      return {
        ...newReview,
        game: db.games.find((game) => game.id === review.gameId),
        user: db.users.find((user) => user.id === constants.adminId)
      };
    },
    likeGameByAdmin(_, { id }) {
      db.games = db.games.map((game) => {
        if (game.id === id) {
          return { ...game, isAdminLiked: !game.isAdminLiked };
        }
        return game;
      });
    
      return db.games.find((game) => game.id === id);
    }
  }
};
