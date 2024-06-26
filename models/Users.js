import mongoose, { Schema, Types } from 'mongoose';

const UserSchema = mongoose.Schema({
  firstName:
  {
    type: String,
    required: true
  },

  lastName:
  {
    type: String,
    required: true
  },
  username:
  {
    type: String,
    required: true,
    unique: true
  },

  email:
  {
    type: String,
    required: true,
    unique: true
  },
  password:
  {
    type: String,
    required: true
  },
  profileImage:
  {
    type: String,
    required: false,
    default: "/api/image/avatar.png"
  },

  isAdmin:
  {
    type: Boolean,
    default: false

  },
  roles:
  {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Role"
  }
},
  {
    timestamps: true
  }

);

export default mongoose.model("Users", UserSchema);
