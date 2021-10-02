const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// GET /api/profile/me
// 获得当前登录用户的profile
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.userid }).populate('user');
        if (!profile) {
            return res.status(400).json({ msg: 'user profile does not exist'});
        }
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error!');
    }
    // res.send('profile route');
})

// POST /api/profile
// 为当前用户创建profile
router.post('/', 
    auth, 
    check('graduation_year', 'graduation year is required').not().isEmpty(),
    check('skills', 'skill is required').not().isEmpty(), 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        // for normal fields
        const { graduation_year, location, bio,  skills } = req.body;
        const profileFields = {};
        profileFields.user = req.userid;
        profileFields.graduation_year = graduation_year;
        if (bio) profileFields.bio = bio;
        if (location) profileFields.location = location;
        profileFields.skills = skills.split(',').map(skill => skill.trim());

        // for websites


        // for career experience


        // for eductaion experience


        console.log(profileFields);
        try {
            let profile = await Profile.findOne({ user: req.userid });
            if (profile){ // update the existing one
                profile = await Profile.findOneAndUpdate({ user: req.userid }, { $set: profileFields }, { new: true });
                return res.json(profile);
            } else { // if profile is not found, then create one
                profile = new Profile(profileFields);
                await profile.save();
                res.json(profile);
            }
            

        } catch (error) {
            console.log(error.message);
            return res.status(500).send('server error');
        }
        res.send('create profile!')
});

module.exports = router;