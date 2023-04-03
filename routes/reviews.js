const express = require("express");
const router = express.Router({mergeParams:true});
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const catchAsync =require('../utils/catchAsync');
const reviews = require('../controllers/reviewsController');


router.post('/', 
    isLoggedIn, 
    validateReview, 
    catchAsync(reviews.createReviews))

router.delete('/:reviewId', 
    isLoggedIn, 
    isReviewAuthor, 
    catchAsync(reviews.deleteReviews))


module.exports = router;