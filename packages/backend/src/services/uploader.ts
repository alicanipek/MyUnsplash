import multer from 'multer';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
    destination: async function (req, _, cb) {
        if (!req.session.user) {
            throw Error();
        }
        const userId = req.session.user.UserName;
        const dir = path.join(__dirname, '../../uploads/' + userId);
        fs.access(dir, function (err) {
            if (err && err.code === 'ENOENT') {
                return fs.mkdir(dir, (error) => cb(error, dir));
            }
            return cb(null, dir);
        });
    },
    filename: function (_1, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
export const upload = multer({ storage: storage });
