export const verifyRecaptcha = async (token) => {
  //Get verification url
  const verifyUrl = `${process.env.RECAPTCHA_VERIFY_URL}?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  try {
    //Post to the verification url and get response
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    //Get the score from the response data
    //If score < 0.7, fail verification
    const resData = await response.json();
    return (
      resData.success &&
      resData.score >= parseFloat(process.env.RECAPTCHA_THRESHOLD ?? "0.7")
    );
  } catch (e) {
    throw e;
  }
};
