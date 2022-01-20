import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    maxNumMembers: {
        type: Number,
        required: true,
        default: 10
    },
    users: [
        {
            type: Object,
        },
    ]
});

// TeamSchema.path('users').validate(function (users) {
//    if (users.length > this.maxNumMembers)
// });

const Team = mongoose.model('Team', TeamSchema);
export default Team;