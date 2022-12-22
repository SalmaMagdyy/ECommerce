import { roles } from "../../middleware/auth.js";


export const endPoints={
    add:[roles.Admin,roles.User],
    remove:[roles.Admin,roles.User]

}