

const languageCodeMap = {
  cpp: 54,
  python: 92,
  javascript: 93,
  java: 91,
};

const key=process.env.REACT_APP_API_KEY

async function getSubmission(tokenId,callback){
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': key,
		'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    return result;
} catch (error) {
	callback({
        apiStatus: "error",
        message: JSON.stringify(error),
      });
}
}

// 3a899b35d8msh8536bf2bdc3319cp1280b0jsn1c5ff2b4d3de
// 4434a167fbmsh896d6aee94e7933p10d255jsn9c6c09b9f096

export async function makeSubmission({ code, language, callback, stdin }) {
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*";

   const Options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": key,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageCodeMap[language],
      source_code: btoa(code),
      stdin: btoa(stdin),
    }),
  };

  try {
    callback({ apiStatus: "loading" });
    const response = await fetch(url, Options);
    const result = await response.json();
    const tokenId = result.token;

    let statusCode = 1;
    let apiSubmissionResult; 
    while (statusCode === 1 || statusCode === 2) {
      try {
         apiSubmissionResult = await getSubmission(tokenId);
        statusCode = apiSubmissionResult.status.id;
      } catch (error) {
        callback({
          apiStatus: "error",
          message: JSON.stringify(error),
        });
        //  break;
        return;
      }
    }

    if (apiSubmissionResult) {
      callback({
        apiStatus: "success",
        data: apiSubmissionResult,
      });
    }
  } catch (error) {
    callback({
      apiStatus: "error",
      message: JSON.stringify(error),
    });
  }
}
