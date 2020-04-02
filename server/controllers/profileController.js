const Profile = require("../models/Profile");
const { validationResult } = require("express-validator");

module.exports.getProfileList = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    if (!profiles) {
      return res.status(404).json({ err: "No profiles founds" });
    }
    res.status(200).json(profiles);
  } catch (err) {
    res.status(400).json("Unable to retreive profiles");
  }
};

module.exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json("Unable to retreive profile");
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  //check validators
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).send({ msg: "Invalid submission", errors });
  }

  const {
    firstName,
    lastName,
    gender,
    birthDate,
    phone,
    address: { address1, address2, city, province, zipCode, country } = {},
    availability,
    profilePic,
    about,
    user
  } = req.body;
  const data = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    birthDate: birthDate,
    phone: phone,
    address: {
      address1: address1,
      address2: address2,
      city: city,
      province: province,
      zipCode: zipCode,
      country: country
    },
    availability: availability,
    profilePic: profilePic,
    about: about,
    user: user
  };
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
    if (!updatedProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res
      .status(200)
      .json({ updatedProfile, msg: "Successfully updated profile" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.createProfile = async (req, res, next) => {
  const errors = validationResult(req);
  //check validators
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).send({ msg: "Invalid submission", errors });
  }

  const {
    firstName,
    lastName,
    gender,
    birthDate,
    phone,
    address: { address1, address2, city, province, zipCode, country } = {},
    availability,
    profilePic,
    about,
    user
  } = req.body;

  const data = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    birthDate: birthDate,
    phone: phone,
    address: {
      address1: address1,
      address2: address2,
      city: city,
      province: province,
      zipCode: zipCode,
      country: country
    },
    availability: availability,
    profilePic: profilePic,
    about: about,
    user: user
  };
  try {
    const newProfile = await Profile.create(data);
    res.status(200).json({ newProfile, msg: "Profile created successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};