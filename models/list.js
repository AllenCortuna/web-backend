import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    hotelName: String,
    name: String,
    price: String,
    creator: String,
    category: [String],
    image: { type: [String], required: true },
    roomStatus: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },

});

var List = mongoose.model('List', listSchema);
export default List;
