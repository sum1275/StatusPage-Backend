const mongoose = require('mongoose');

// Define the Status schema with _id: false
const statusSchema = new mongoose.Schema({
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
}, { _id: false }); // This disables _id generation for status documents

// Define the main Issue schema
const issueSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    application: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    statuses: [statusSchema],
    userId: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        required: true
    }
});

// Rest of your middleware remains the same...
// Middleware to update the timestamp before saving
issueSchema.pre('save', function(next) {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    this.timestamp = new Date(Date.now() + istOffset); // Set the timestamp to the current IST
    next();
});

// Middleware to update the timestamp before updating
issueSchema.pre('findOneAndUpdate', function(next) {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    this.set({ timestamp: new Date(Date.now() + istOffset) }); // Set the timestamp to the current IST
    next();
});

// Create the Issue model
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;