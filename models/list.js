import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    name: String,
    price: String,
    tag: String,
    date: Date,
    creator: String,
    // updatedAt: {
    //     type: Date,
    //     default: new Date(),
    // },
    // category: [String],

});

var List = mongoose.model('List', listSchema);
export default List;
