const { v4: uuidv4 } = require("uuid");
const PersonalityTestQuestion = require("../models/personalityTestQuestion");

exports.createPersonalityTestQuestion = async (req, res) => {
  const { question, type, dataType, choices, version, gender } = req.body;

  if (!question || !type || !dataType || !choices) {
    return res
      .status(400)
      .json({ message: "question, type, dataType, and choices are required" });
  }

  try {
    const newPersonalityTestQuestion = await PersonalityTestQuestion.create({
      id: uuidv4(),
      question,
      type,
      dataType,
      choices,
      version,
      gender,
    });

    res.status(201).json(newPersonalityTestQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getPersonalityTestQuestions = async (req, res) => {
  try {
    const personalityTestQuestions = await PersonalityTestQuestion.findAll();
    res.status(200).json(personalityTestQuestions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getPersonalityTestQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const personalityTestQuestion = await PersonalityTestQuestion.findByPk(id);

    if (!personalityTestQuestion) {
      return res
        .status(404)
        .json({ message: "Personality test question not found" });
    }

    res.status(200).json(personalityTestQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updatePersonalityTestQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, type, dataType, choices, version, gender } = req.body;

  try {
    const personalityTestQuestion = await PersonalityTestQuestion.findByPk(id);

    if (!personalityTestQuestion) {
      return res
        .status(404)
        .json({ message: "Personality test question not found" });
    }

    if (!question || !type || !dataType || !choices) {
      return res.status(400).json({
        message: "question, type, dataType, and choices are required",
      });
    }

    if (question !== personalityTestQuestion.question)
      personalityTestQuestion.question = question;
    if (type !== personalityTestQuestion.type)
      personalityTestQuestion.type = type;
    if (dataType !== personalityTestQuestion.dataType)
      personalityTestQuestion.dataType = dataType;
    if (choices !== personalityTestQuestion.choices)
      personalityTestQuestion.choices = choices;
    if (version !== personalityTestQuestion.version)
      personalityTestQuestion.version = version;
    if (gender !== personalityTestQuestion.gender)
      personalityTestQuestion.gender = gender;

    await personalityTestQuestion.save();
    res.status(200).json(personalityTestQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deletePersonalityTestQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const personalityTestQuestion = await PersonalityTestQuestion.findByPk(id);

    if (!personalityTestQuestion) {
      return res
        .status(404)
        .json({ message: "Personality test question not found" });
    }

    await personalityTestQuestion.destroy();
    res
      .status(200)
      .json({ message: "Personality test question deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
