import {roles} from '../../middleware/auth.js'

export const endPoints ={
    addSubCategory: [roles.Admin,roles.User]

}