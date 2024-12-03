export const getInterviews = async () => {
  try {
    const response = await fetch(`api/interview`);
    const data = await response.json();

    //eslint-disable-next-line
    console.log("data:..", data);

    return data;
  } catch (error) {
    //eslint-disable-next-line
    console.error("Error fetching data:", error);
  }
};
