const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createPersonalityTestQuestion(
  question,
  type,
  dataType,
  choices,
  version = "1.0.0",
  gender = "man",
) {
  try {
    await connection.query(
      "INSERT INTO personality_test_questions (id, question, type, data-type, choices, version, gender) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, question, type, dataType, JSON.stringify(choices), version, gender],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return id;
        }
      },
    );
    //return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPersonalityTestQuestionById(questionId) {
  try {
    const result = await connection.query(
      "SELECT * FROM personality_test_questions WHERE id = ?",
      [questionId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result[0];
        }
      },
    );
    //return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllPersonalityTestQuestions() {
  try {
    const result = await connection.query(
      "SELECT * FROM personality_test_questions",
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
    //return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePersonalityTestQuestionById(
  questionId,
  newQuestion,
  newType,
  newDataType,
  newChoices,
  newVersion,
  newGender,
) {
  try {
    await connection.query(
      "UPDATE personality_test_questions SET question = ?, type = ?, `data-type` = ?, " +
        "choices = ?, version = ?, gender = ? WHERE id = ?",
      [
        newQuestion,
        newType,
        newDataType,
        JSON.stringify(newChoices),
        newVersion,
        newGender,
        questionId,
      ],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deletePersonalityTestQuestionById(questionId) {
  try {
    await connection.query(
      "DELETE FROM personality_test_questions WHERE id = ?",
      [questionId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}
