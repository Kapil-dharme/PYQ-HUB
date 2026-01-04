const { Router } = require("express")
const Paper = require("../models/papers")
const bcrypt = require('bcrypt')
const { generateToken, verifyToken } = require("../services/authentication")
const router = Router()

//handling the get and post request of browsepapers
router.get('/browsepapers', (req, res) => {
    return res.render("browsepapersform")
})

router.post("/browsepapers", async (req, res) => {
    let { year, subject } = req.body
    try {
        if (!subject || !year) {
           return res.render("browsepapersform", {
                error: "Please fill out the details."
            })
        }
        if (subject) {
            subject = subject.toLowerCase().trim()
        }
        const papers = await Paper.find({
            year: Number(year),
            subject: { $regex: subject, $options: "i" }
        });
        return res.render("papersdashboard", {
            papers: papers
        })
    } catch (error) {
        return res.render("browsepapersform", {
            error: "cannot find the papers"
        })
    }

})

//handling the get and post request of adminLogin
router.get('/adminLogin', (req, res) => {
    res.render('adminloginform')
})

router.post('/adminLogin', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.render("adminloginform", {
            error: "All fields are required"
        })
    }
    else {
        try {
            if (email == process.env.ADMIN_1_EMAIL) {
                const isValid = await bcrypt.compare(password, process.env.ADMIN_1_PASSWORD)
                if (!isValid) {
                    return res.render('adminloginform', {
                        error: "Invalid Credentials"
                    });
                }

                // Password is correct :- generate token
                const token = generateToken(email);

                //send token via cookie and Redirect to admin dashboard
                return res.cookie('token', token).redirect('/?success=You logged in successfully.')

            }
        } catch (error) {
            return res.render('adminloginform', {
                error: "Invalid Credentials"
            })

        }
    }
})



module.exports = router