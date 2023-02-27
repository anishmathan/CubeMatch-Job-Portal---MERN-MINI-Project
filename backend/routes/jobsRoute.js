const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel")
const User = require("../models/userModel")
const moment = require("moment");
const confirmationMail = require("../utils/ConfirmationMail");

router.get("/getalljobs", async (req, res) => {

    try {
        const jobs = await Job.find()
        res.send(jobs)
    } catch (error) {
        return res.status(400).json({ error });
    }

});


router.post("/postjob", async (req, res) => {

    try {
        const newjob = new Job(req.body)
        await newjob.save()
        res.send('Job Posted Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }

});



router.post("/editjob", async (req, res) => {

    try {
        const updatedjob = await Job.findOneAndUpdate({ _id: req.body._id }, req.body)
        res.send('Job Updated Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.delete("/deletejob/:id", async (req, res) => {

    try {
        console.log("del: ", req.params._id);
        const deletedjob = await Job.deleteOne({ _id: req.params.id })
        console.log('deletedjob: ', deletedjob);
        res.send('Job Deleted Successfully Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }

});

// 63bd5c564247fc1ec6f4d2c1
router.get('/notifications/:id', async (req, res) => {
    console.log('Notify');
    const userId = req.params.id;

    const userPostedNotify = await Job.find({ postedBy: userId })
    console.log('userPostedNotify: ', userPostedNotify);

    var appliedCount = 0
    userPostedNotify.forEach(element => {
        console.log('Emp: ', element.appliedCandidates.length);
        if (element.appliedCandidates.length !== 0) {
            appliedCount++
        }
    });
    res.status(200).json({ AppliedCount: appliedCount })
})

router.post("/applyjob", async (req, res) => {

    const { user, job } = req.body

    try {

        const jobDetails = await Job.findOne({ _id: job._id })

        const appliedCandidate = {
            userid: user._id,
            appliedDate: moment().format('MMM DD yyyy')
        }

        jobDetails.appliedCandidates.push(appliedCandidate)

        await jobDetails.save()

        const userDetails = await User.findOne({ _id: user._id })

        const appliedJob = {
            jobid: job._id,
            appliedDate: moment().format('MMM DD yyyy')
        }

        userDetails.appliedJobs.push(appliedJob)

        await userDetails.save()

        // res.send('Job Applied Successfully')
        confirmationMail();
        

    } catch (error) {

        res.send(error)

    }





});



module.exports = router;
