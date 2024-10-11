import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";
import mongoose from "mongoose";
import day from "dayjs";
// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const { search, jobsStatus, jobType, sort } = req.query;
  const queryObj = {
    createdBy: req.user.userId,
  };
  if (jobsStatus && jobsStatus !== "all") {
    queryObj.jobsStatus = jobsStatus;
  }
  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }
  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  //setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);
  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

// CREATE JOB

export const createJob = async (req, res) => {
  // const {company,position} = req.body
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(StatusCodes.OK).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "job modified", joba: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  // const job = jobs.find((job) => job.id === id);
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  // const newJobs = jobs.filter(job => job.id !== id)
  // jobs = newJobs
  res.status(StatusCodes.OK).json({ msg: " job deleted", job: removedJob });
};

export const showStats = async (req, res) => {
  // let stats = await Job.aggregate([
  //   { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
  //   { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  // ]);
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobsStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  // let monthlyApplications = [
  //   { date: "May 23", count: 12 },
  //   { date: "Jun 23", count: 9 },
  //   { date: "Jun 23", count: 3 },
  // ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
