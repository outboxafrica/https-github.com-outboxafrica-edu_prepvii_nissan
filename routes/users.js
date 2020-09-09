const router=require('express').Router();
const {userRegister, userLogin, userAuth, serlializeUser, checkRole}=require('../utils/config');

//Users Registration routes
router.post('/register-user', async(req, res)=>{
    await userRegister(req.body, 'user', res)
})
//admin authentication routes
router.post('/register-admin', async(req, res)=>{
    await userRegister(req.body, 'admin', res)
})
//super admin routes
router.post('/register-superadmin', async(req, res)=>{
    await userRegister(req.body, 'superadmin', res)
})
//users login route
router.post('/login-user', async(req, res)=>{
    await userLogin(req.body, 'user', res);
})

//admin login route
router.post('/login-admin', async(req, res)=>{
    await userLogin(req.body, 'admin', res);
})
//user admin login route
router.post('/login-superadmin', async(req, res)=>{
    await userLogin(req.body, 'superadmin', res);
})
//users profile
router.get('/profile', userAuth, async(req, res)=>{
    return res.json(serlializeUser(req.user));
});
//users protected route
router.get('/user-protected', userAuth, checkRole('user'), async(req, res)=>{
    res.status(200).json('Hello user!')
});
//admin protected route
router.get('/admin-protected', userAuth, checkRole('admin'), async(req, res)=>{
    res.status(200).json('Hello Admin!')
})
//superadmin protected route
router.get('/superadmin-protected', userAuth, checkRole('superadmin'), async(req, res)=>{
    res.status(200).json('Hello super admin!')
});
//common route for admins and superadmins
router.post('/superadmin-protected', userAuth, checkRole('superadmin', 'admin'), async(req, res)=>{
    res.status(200).json('Hello admin and superadmin!')
})

module.exports=router;