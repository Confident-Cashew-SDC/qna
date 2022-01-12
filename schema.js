var productSchema = mongoose.Schema({
  questions: [{
    _id: {
      unique: true,
      type: Number,
      required: true,
    },
    product_id: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
    asker_name: {
      type: String,
    },
    helpfulness: {
      type: Number,
      default: 0
    },
    email: {
      type: String
    },
    reported: {
      type: Boolean,
      default: false
    },
    answers: [{
      id: {
        type: Number,
        required: true,
      },
      question_id: {
        type: Number,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now
      },
      asker_name: {
        type: String,
      },
      helpfulness: {
        type: Number,
        default: 0
      },
      email: {
        type: String
      },
      reported: {
        type: Boolean,
        default: false
      },
      photos: [{
        id: {
          type: Number,
          required: true,
        },
        url: {
          type: String
        }
      }]
    }]
  }]
})