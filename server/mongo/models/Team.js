import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ]
});

mongoose.set('runValidators', true);

const Team = mongoose.model('Team', TeamSchema);
export default Team;