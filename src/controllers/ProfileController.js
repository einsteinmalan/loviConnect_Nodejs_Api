const { v4: uuidv4 } = require("uuid");
const Profile = require("../models/profile");
const User = require("../models/user");

exports.createProfile = async (req, res) => {
  const {
    id_user,
    gender,
    sexuality,
    birthday,
    biography,
    my_contribution,
    my_expectation,
    location_lat,
    location_lon,
    zodiac_sign,
    job,
    relationship_status,
    looking_for,
    religion,
    avatar,
    fame,
    city,
    country_name,
    country_code,
  } = req.body;

  if (!id_user) {
    return res.status(400).json({ message: "id_user is required" });
  }

  try {
    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProfile = await Profile.create({
      id: uuidv4(),
      id_user,
      gender,
      sexuality,
      birthday,
      biography,
      my_contribution,
      my_expectation,
      location_lat,
      location_lon,
      zodiac_sign,
      job,
      relationship_status,
      looking_for,
      religion,
      avatar,
      fame,
      city,
      country_name,
      country_code,
    });

    res.status(201).json(newProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const {
    id_user,
    gender,
    sexuality,
    birthday,
    biography,
    my_contribution,
    my_expectation,
    location_lat,
    location_lon,
    zodiac_sign,
    job,
    relationship_status,
    looking_for,
    religion,
    avatar,
    fame,
    city,
    country_name,
    country_code,
  } = req.body;

  try {
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (id_user !== undefined) profile.id_user = id_user;
    if (gender !== undefined) profile.gender = gender;
    if (sexuality !== undefined) profile.sexuality = sexuality;
    if (birthday !== undefined) profile.birthday = birthday;
    if (biography !== undefined) profile.biography = biography;
    if (my_contribution !== undefined)
      profile.my_contribution = my_contribution;
    if (my_expectation !== undefined) profile.my_expectation = my_expectation;
    if (location_lat !== undefined) profile.location_lat = location_lat;
    if (location_lon !== undefined) profile.location_lon = location_lon;
    if (zodiac_sign !== undefined) profile.zodiac_sign = zodiac_sign;
    if (job !== undefined) profile.job = job;
    if (relationship_status !== undefined)
      profile.relationship_status = relationship_status;
    if (looking_for !== undefined) profile.looking_for = looking_for;
    if (religion !== undefined) profile.religion = religion;
    if (avatar !== undefined) profile.avatar = avatar;
    if (fame !== undefined) profile.fame = fame;
    if (city !== undefined) profile.city = city;
    if (country_name !== undefined) profile.country_name = country_name;
    if (country_code !== undefined) profile.country_code = country_code;

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    await profile.destroy();
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
