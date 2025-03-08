import multiparty from 'multiparty';

const parseMultipartyForm = (req, res, next) => {
    const form = new multiparty.Form();
    
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                status: 400,
                message: "Error parsing form data"
            });
        }
        
        req.body = {};
        Object.keys(fields).forEach(key => {
            req.body[key] = fields[key][0];
        });
        
        if (files.content && files.content[0]) {
            req.body.content = files.content[0];
        }
        
        next();
    });
};

export default parseMultipartyForm;
