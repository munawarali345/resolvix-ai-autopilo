// here we do pagination work then yaha se hum use krenge jaha need hugi hame
import { Request, Response, NextFunction } from 'express';

// middlewere pagination function
export const PaginationMiddlewere = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // query me se page nikal rahe he
  const page = Number(req.query.page) || 1;
  // query me se limit nikal rahe he
  const limit = Number(req.query.limit) || 10;

  // sefty checks 1 se kum na hu negitive value na hu agar hua to crash ni huga 1
  const safepage = page < 1 ? 1 : page;
  // limit 100 k under under ho us se uper ni
  const safelimit = limit > 100 ? 100 : limit;

  // skip calculation (offset pagination)
  const skip = (safepage - 1) * safelimit;

  // yaha hum req me attach kaer rahe he (important)
  req.pagination = {
    page: safepage,
    limit: safelimit,
    skip,
  };

  next();
};
// ends here

export default PaginationMiddlewere;

// Request
// ↓
//Pagination Middleware   👉 page, limit, skip calculate
//↓
//Controller              👉 req.pagination forward
//↓
//Service                 👉 business logic
// ↓
//Model (DB query)        👉 skip & take use
// ↓
//Response
