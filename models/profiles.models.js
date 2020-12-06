const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    website: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },
    githubusername: {
      type: String,
      default: "",
    },

    experience: [
      {
        title: {
          type: String,
          required: true,
        },

        company: {
          type: String,
          required: true,
        },

        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
        current: {
          type: Boolean,
          default: false,
        },
      },
    ],

    education: [
      {
        education: {
          type: String,
          required: true,
        },
        course: {
          type: String,
          required: true,
        },
        specialization: {
          type: String,
          required: true,
        },
        university: {
          type: String,
          required: true,
        },
        passing_year: {
          type: String,
          required: true,
        },
      },
    ],

    social: {
      facebook: {
        type: String,
      },

      instagram: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
