const mongoose = require('mongoose');

const personSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter your name"]
        },
        surname:{
            type: String,
            required: [true, "Please enter your surname"]
        },
        age:{
            type: Number,
            required: false
        },
        languages:{
            type: [String],
            required: false
        }
    },
    {
        timestamps: true
    }

)

const Person = mongoose.model('Person', personSchema);
module.exports = Person;