import { connectToDB } from '../../../../utils/database'
import Cars from '../../../../models/cars'

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const datas = await Cars.findById(params.id)



        return new Response(JSON.stringify(datas), {
            status: 200
        })
    } catch (error) {
        return new Response("Cannot get cars ", {
            status: 500
        })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        console.log(params)

        await Cars.findByIdAndRemove(params.id)

        return new Response("Car deleted succesfully", {
            status: 200
        })
    } catch (error) {
        return new Response('Car is not deleted succesfully', {
            status: 500
        })
    }
}

export const PATCH = async (req, { params }) => {
    const { query, query2, price, vites, highway_mpg, city_mpg, year, isRent } = await req.json()

    try {
        await connectToDB();

        const existingCar = await Cars.findById(params.id)

        if (!existingCar) return new Response('Car is not found in database', {
            status: 500
        })

        existingCar.carbrand = query;
        existingCar.carmodel = query2;
        existingCar.price = price;
        existingCar.vites = vites;
        existingCar.highway_mpg = highway_mpg;
        existingCar.city_mpg = city_mpg;
        existingCar.year = year;
        existingCar.isRent = isRent;

        await existingCar.save();

        return new Response(JSON.stringify(existingCar), {
            status: 200
        })
    } catch (error) {
        return new Response('Failed to update car', {
            status: 500
        })
    }
}