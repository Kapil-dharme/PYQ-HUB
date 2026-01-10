const { Router } = require("express")
const Paper = require("../models/papers")
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const router = Router()

// managing get and post request for adding paper

router.get("/add-paper", (req, res) => {
  return res.render("addpaper")
})

//cloud setup

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { year, subject } = req.body;

    return {
      folder: "pyq-hub",
      resource_type: "raw",
      format: "pdf",
      public_id: `${year}/${subject}/${Date.now()}.pdf`
    };
  }
});


const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      req.fileValidationError = "Only pdf's are allowed."
      cb(null, false);
    }
  }
});

router.post("/add-paper", (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.render("addpaper", {
          error: "File is too large! Max limit is 10MB."
        });
      }
      return res.render("addpaper", {
        error: "Upload failed: " + err.message
      });
    }

    try {
      let { year, subject } = req.body
      if (req.fileValidationError) {
        return res.render("addpaper", {
          error: req.fileValidationError
        })
      }
      if (!year || !subject || !req.file) {
        return res.render("addpaper", {
          error: "Please fill all details"
        })
      }
      subject = subject.toLowerCase().trim();
      await Paper.create({
        year: year,
        subject: subject,
        fileUrl: req.file.path,
        publicId: req.file.filename,
      })

      return res.render("addpaper", {
        success: "Paper uploaded successfully",
        fileUrl: req.file.path
      });

    } catch (err) {
      return res.render("addpaper", {
        error: "Upload Failed"
      })
    }
  });
});

//managing get request for show all paper
router.get("/show-paper", async (req, res) => {
  const papers = await Paper.find({});
  return res.render("papersdashboard", { papers: papers })
})

//managing the post request for deleting the paper

router.post("/delete-paper/:id", async (req, res) => {

  if (!req.admin) {
    return res.render("adminloginform", {
      error: "Please login as admin first."
    });
  }
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.redirect("/admin/show-paper");
    }

    await cloudinary.uploader.destroy(paper.publicId, {
      resource_type: "raw"
    });

    await Paper.findByIdAndDelete(req.params.id);

    return res.redirect("/admin/show-paper?success=Paper deleted successfully.");

  } catch (error) {
    return res.redirect("/admin/show-paper?error=System error ,Please try again");
  }
});

//admin logout
router.get("/adminLogout", (req, res) => {
  return res.clearCookie("token").redirect("/")
})

module.exports = router