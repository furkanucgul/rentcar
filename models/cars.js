import { Schema, model, models } from "mongoose";

const carsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    carbrand: {
        type: String,
        required: [true, 'model is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    carmodel:{
        type:String,
        required: [true, 'model is required']
    },
    vites: {
        type: String,
        required: [true, 'vites is required']
    },
    city_mpg: {
        type: Number,
        required: [true, 'city_mpg is required']
    },
    highway_mpg: {
        type: Number,
        required: [true, 'higway_mpg is required']
    },
    year: {
        type: Number,
        required: [true, 'year is required']
    },
    isRent: {
        type: Boolean,
        required: [true, 'isRent situation is required']
    }

})

const Cars = models.Cars || model('Cars', carsSchema);

export default Cars;