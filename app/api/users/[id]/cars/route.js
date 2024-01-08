import {connectToDB} from '../../../../../utils/database'
import Cars from '../../../../../models/cars'

export const GET = async(req, {params}) => {
    try {
        await connectToDB();
        const cars = await Cars.find({
            userId: params.id
        }).populate('userId')

        return new Response(JSON.stringify(cars),{
            status:200
        })
    } catch (error) {
        return new Response('failed to get profile cars',{
            status:500
        })
    }
}