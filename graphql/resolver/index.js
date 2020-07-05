const Event = require("../../Models/event");
const User = require("../../Models/User");
const bycrypt = require("bcryptjs");

module.exports = {
  events: async () => {
    try {
      let events = await Event.find();
      events.map((event) => {
        return { ...event._doc, _id: event.id };
      });
      return events;
    } catch (error) {
      throw error;
    }
  },
  createEvent: (args) => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
      });
      let createEvent = event.save();
      return { ...createEvent._doc, _id: createEvent.id };
    } catch (error) {
      throw error;
    }
  },
  createUser: async (args) => {
    try {
      const hashPassword = await bycrypt.hash(args.userInput.password, 12);
      const createUser = new User({
        email: args.userInput.email,
        password: hashPassword,
      });
      const result = await createUser.save();
      return { ...result._doc, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
};
