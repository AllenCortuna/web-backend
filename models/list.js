import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    name: String,
    price: String,
    detail: String,
    creator: String,
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    // category: [String],

});

var List = mongoose.model('List', listSchema);
export default List;
