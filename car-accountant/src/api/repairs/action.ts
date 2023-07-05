const URL = 'http://localhost:3005'

export const fetchAllRepairs = async (companyId: string) => {
    console.log("in fetch all repairs ==>", companyId);

    try {
        const response = await fetch(`${URL}/repair`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Company-ID": companyId,
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = response.json()

        if (result) {
            return result
        }
    }
    catch (error) {
        console.error("Need to set popup here to shown error")
    }
}

