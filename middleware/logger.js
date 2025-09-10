import { appendFileSync } from 'fs';

const Loggermiddleware = (req, res, next) => {
    const log = `\n [${Date.now()}] ${req.method}, ${req.url};`
    appendFileSync('entry.txt', log, 'utf-8');
    next();
};
export default Loggermiddleware;