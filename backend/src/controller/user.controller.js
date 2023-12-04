const { User } = require("../model/User");
const { responseBuilder, hashMake, Validator } = require("../utils");
const user = new User()

const index = async (req, res, next) => {
    const { user_name, email, phone, user_type, status, perPage = 20, page = 1, getCount } = req.query;
    try {
        return res.status(200).send(responseBuilder(200, await user.get({ user_name, email, phone, user_type, status, perPage, page, getCount }), 'Successfully fetched data'))
    } catch (e) {
        return next(e);
    }
}


const login = async (req, res, next) => {
    const { username, password } = req.body;
    const validator = await Validator([
        {
            key: 'username',
            message: 'invalid username',
            required: true
        },
        {
            key: 'password',
            message: 'invalid password',
            required: true
        }], { username, password });
    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(400, {}, validator.messages))
    }
    try {
        const loginData = await user.login({ username, password });
        if (!loginData) {
            return res.status(401).send(responseBuilder(401, {}, 'Unauthorize'))
        }
        return res.status(200).send(responseBuilder(200, loginData, loginData.user_name+', you are now successfully loged in'))
    } catch (e) {
        return next(e);
    }
}


const create = async (req, res, next) => {
    const { user_name, email, phone, user_type, status, details, password } = req.body;
    const validator = await Validator([
        {
            key: 'email',
            message: 'Invalid email',
            test: /\w+@\w+.\w+/,
            required: true
        },
        {
            key: 'email',
            message: 'User already exists',
            uniqueCheck: { table: 'users', field: 'email' }
        },
        {
            key: 'phone',
            message: 'Phone number is required',
            required: true
        },
        {
            key: 'phone',
            message: 'Phone number already exists',
            uniqueCheck: { table: 'users', field: 'phone' }
        },
        {
            key: 'user_type',
            message: 'invalid User Type',
            test: /(internal|external)/,
            required: true
        },
        {
            key: 'user_name',
            message: 'invalid User Name',
            required: true
        },
        {
            key: 'status',
            message: 'invalid status',
            test: /(0|1)/,
        },
        {
            key: 'password',
            message: 'invalid password, password size must be 8 to 20',
            minLen: 8,
            maxLen: 20
        }
    ], { user_name, email, phone, user_type, status, details, password });
    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(200, {}, validator.messages));
    }
    const hashedPass = hashMake(password)
    try {
        return res.status(200).send(responseBuilder(200, await user.create({ user_name, email, phone, user_type: 'internal', status, details, password: hashedPass, created_by: req.user_id }),'User has been created successfully'))
    } catch (e) {
        return next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const userData = await user.getById(req.params.id)
        if (!userData) next(404)
        return res.status(200).send(responseBuilder(200, userData, 'User\'s Data has been fetched successfully'))
    } catch (e) {
        return next(e);
    }

}


const update = async (req, res, next) => {
    try {
        let { user_name, email, phone, user_type, status, details, password } = req.body;
        const validator = await Validator([
            {
                key: 'email',
                message: 'invalid email',
                test: /\w+@\w+.\w+/,
                required: true
            },
            {
                key: 'email',
                message: 'User already exists',
                uniqueCheck: { table: 'users', field: 'email' }
            },
            {
                key: 'phone',
                message: 'Phone number is required',
                required: true
            },
            {
                key: 'phone',
                message: 'Phone number already exists',
                uniqueCheck: { table: 'users', field: 'phone' }
            },
            {
                key: 'user_type',
                message: 'invalid user_type',
                test: /(internal|external)/,
                required: true
            },
            {
                key: 'user_name',
                message: 'invalid user_name',
                required: true
            },
            {
                key: 'status',
                message: 'invalid status',
                test: /(0|1)/,
            }
        ], { user_name, email, phone, user_type, status, details, password }, req.params.id);
        if (!validator.isAcceptable) {
            return res.status(400).send(responseBuilder(400, {},  validator.messages))
        }

        const currentUser = (await user.getBy({ fieldname: 'id', value: req.params.id }))[0];

        if (!currentUser) {
            return res.status(400).send(responseBuilder(404, {}, "User does not exist's"))
        }
        if (currentUser.password !== password) {
            password = hashMake(password);
        }
        const response = await user.update(req.params.id, { user_name, email, phone, user_type: 'internal', status, details, password, created_by: req.user_id })
        if(response) return res.status(200).send(responseBuilder(200, response, 'User updated successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        if(req.params.id==req.user_id){
            return res.status(500).send(responseBuilder(500, {}, 'Unsupported action, user is not permited to remove himself'))
        }
        let response = await user.delete(req.params.id)
        if(response==1)  return res.status(200).send(responseBuilder(200, response, 'Data has been deleted successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}

const getUserDashboard =async (req, res, next)=>{
    try{

        return res.send(responseBuilder(200,await user.getDashboard(), "Dashboard data was fetched successfully"))
    }catch(e){
        return next(e)
    }
}
module.exports = { index, create, get, update, remove, login, getUserDashboard }