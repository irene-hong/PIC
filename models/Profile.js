const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    // 用户ID
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  graduation_year: {
    // 毕业年份
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  location: {
    // 所在地
    type: String,
  },
  bio: {
    // 个人简介
    type: String,
  },
  website: {
    type: String,
  },
  skills: {
    // 技能
    type: [String],
    required: true,
  },
  professional_experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        required: true,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education_experience: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      major: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        required: true,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
