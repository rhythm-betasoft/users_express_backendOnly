import {v2 as cloudinary} from 'cloudinary'
 import dotenv from 'dotenv'
 dotenv.config()
cloudinary.config(
    {
        cloud_name:"dn6thwmgm",
        api_key:"757118979882867",
        api_secret:"he1N8yz2P_1QjfSdIPbYG9XbdOs"
    }
)
 
export default cloudinary
 