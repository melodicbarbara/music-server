import multiparty from 'multiparty';
import fs from 'fs';

const parseMultipartyForm = (req, res, next) => {
    const form = new multiparty.Form();
    
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                status: 400,
                message: "Error parsing form data"
            });
        }
        
        // Validate if content file exists
        if (!files.content || !files.content[0]) {
            return res.status(400).json({
                status: 400,
                message: "Content file is required"
            });
        }

        req.body = {};
        Object.keys(fields).forEach(key => {
            req.body[key] = fields[key][0];
        });
        
        try {
            // Read and validate file content
            const fileContent = fs.readFileSync(files.content[0].path);
            if (!fileContent || fileContent.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: "Content file is empty"
                });
            }
            req.body.content = fileContent;
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "Error reading file content"
            });
        }
        
        next();
    });
};

export default parseMultipartyForm;
