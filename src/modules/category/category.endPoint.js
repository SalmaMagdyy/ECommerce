import { roles } from "../../middleware/auth.js";


export const endPoints={
    addCategory:[roles.Admin,roles.User],
    updateCategory:[roles.Admin]
}