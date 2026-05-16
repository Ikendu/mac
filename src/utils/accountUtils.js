// Utility function to fetch account details from the database
export const fetchAccountDetails = async () => {
  try {
    const response = await fetch("https://macdon.morelinks.com.ng/get_account_details.php");
    const data = await response.json();
    if (data.success) {
      return {
        account_number: data.account_number,
        account_name: data.account_name,
      };
    } else {
      console.error("Failed to fetch account details:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching account details:", error);
    return null;
  }
};

// Utility function to save account details to the database
export const saveAccountDetails = async (account, name) => {
  try {
    const response = await fetch("https://macdon.morelinks.com.ng/save_account_details.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, name }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving account details:", error);
    return { success: false, message: "Failed to reach server" };
  }
};
