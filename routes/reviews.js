const express = require("express");
const router = express.Router({mergeParams:true});
const { validateReview } = require('../middleware');
const catchAsync =require('../utils/catchAsync');
const Review = require('../models/review');
const Campground = require('../models/campgrounds');

router.post('/',validateReview, catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review added Successfully!');
    res.redirect(`/campgrounds/${campground._id}`);
}))
router.delete('/:reviewId', catchAsync(async(req,res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review Deleted Successfully!');
    res.redirect(`/campgrounds/${id}`);
}))


module.exports = router;