import mongoose from 'mongoose';
const waitlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
    },
    sex: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other', 'prefer_not_to_say'],
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});
const Waitlist = mongoose.model('Waitlist', waitlistSchema);
export default Waitlist;
