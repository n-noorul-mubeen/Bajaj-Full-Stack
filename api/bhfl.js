
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "Method not allowed" });
  }
  try {
    const fullName = "john_doe";
    const dob = "17091999";
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    let { data } = req.body;
    if (!Array.isArray(data)) throw new Error("Input 'data' must be an array");

    data = data.map(String);

    const even_numbers = data.filter(d => /^\d+$/.test(d) && Number(d) % 2 === 0);
    const odd_numbers = data.filter(d => /^\d+$/.test(d) && Number(d) % 2 === 1);
    const alphabets = data.filter(d => /^[a-zA-Z]+$/.test(d)).map(s => s.toUpperCase());
    const special_characters = data.filter(d => !/^\d+$/.test(d) && !/^[a-zA-Z]+$/.test(d));

    const sum = data.filter(d => /^\d+$/.test(d)).map(Number).reduce((a, b) => a + b, 0).toString();

    // Concatenate all alphabets (as string, not array)
    let concat_str = data.filter(d => /^[a-zA-Z]+$/.test(d)).join('');
    concat_str = [...concat_str].reverse().map((c, i) =>
      i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()
    ).join('');

    res.status(200).json({
      is_success: true,
      user_id: `${fullName.toLowerCase()}_${dob}`,
      email,
      roll_number: rollNumber,
      odd_numbers: odd_numbers,
      even_numbers: even_numbers,
      alphabets: alphabets,
      special_characters: special_characters,
      sum: sum,
      concat_string: concat_str
    });
  } catch (err) {
    res.status(400).json({
      is_success: false,
      message: err.message
    });
  }
};

export default handler;
