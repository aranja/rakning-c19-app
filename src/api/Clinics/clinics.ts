export const getClinics = async () => {
    const res = await fetch(`https://www.heilsuvera.is/Umbraco/Surface/Map/GetPackages?mapPageId=8833`, {
        method: 'POST',
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        // returns data as null
    }

    if (!data?.success) {
        //error
    }
    
    return data?.packages ?? [];
};