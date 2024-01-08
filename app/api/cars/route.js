import { connectToDB } from '@/utils/database'
import Cars from '../../../models/cars';

export const GET = async (req) => {

    try {
        await connectToDB();

        const datas = await Cars.find({isRent: true}).populate('userId')

        return new Response(JSON.stringify(datas), {
            status: 200
        })
    } catch (error) {
        return new Response('failed to get cars', {
            status: 500
        })
    }
}
export const POST = async (req) => {
    const { carmodel, carbrand, price, vites, userId, city_mpg, highway_mpg, year, isRent } = await req.json();

    try {
        await connectToDB();

        const newCar = new Cars({
            carmodel,
            carbrand,
            price,
            vites,
            userId,
            city_mpg,
            highway_mpg,
            year,
            isRent
        })

        await newCar.save();

        return new Response(JSON.stringify(newCar), {
            status: 201
        })
    } catch (error) {
        return new Response('Failed to save new car!',{
            status: 500
        })
    }
}