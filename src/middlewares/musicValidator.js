import Joi from "joi";

const musicScheme = Joi.object({
    orchestra: Joi.string().min(3).required(),
    concerts: Joi.string(),
    title: Joi.string().min(3).required(),
    content: Joi.binary()
});

const validateMusic = (req, res, next) => {
    console.log('Validating request:', {
        file: req.file,
        body: req.body
    });

    if (!req.file) {
        console.log('File missing in request');
        return res.status(400).json({
            status: 400,
            message: "Please upload a file in the 'content' field"
        });
    }

    // Validate other fields
    const { error } = musicScheme.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }

    next();
}

export default validateMusic;