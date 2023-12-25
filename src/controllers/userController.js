import knex from "knex";
import db from '../../index.js'
class UserController {
  async getUsers(req, res){
    try {
        const userList = await db('users')
            .select([
                'users.id as user_id',
                'users.name as user_name',
            ])

        return res.status(200).json({data: userList, message: "User list"})
    } catch (error) {
        return res.status(error.code).json({message: error.message})
    }
  }

    async addUser(req, res){
        try {
            const { validatedUserData } = req;
            const {name, phone} = validatedUserData;
            await db('users')
                .insert({name, phone});

            const user = await db('users')
                .select([
                    'users.id as user_id',
                    'users.name as user_name',
                    'users.phone as user_phone',
                ])
                .orderBy('id', 'desc')
                .first();

            return res.status(200).json({data: user, message: "Successfully created"})
        } catch (error) {
            return res.status(error.code).json({message: error.message});
        }
    }
}

export default UserController;
