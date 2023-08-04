import { connectToDB } from '../../../../../utils/database'
import Cars from '../../../../../models/cars'

export const PATCH = async (req, { params }) => {
    const { isRent } = await req.json()

    try {
        await connectToDB();

        const existingCar = await Cars.findById(params.id)

        if (!existingCar) return new Response('Car is not found in database', {
            status: 500
        })

        
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