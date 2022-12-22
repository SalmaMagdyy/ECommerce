import { roles } from "../../middleware/auth.js";


export const endPoints={
    createBrand:[roles.Admin],
    updateBrand:[roles.Admin,roles.User]

}