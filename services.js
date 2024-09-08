const validateBeneficiary = async (medicalHistory) => {
    // Lógica para validar el historial médico
    return medicalHistory.includes('terminal') || medicalHistory.includes('chronic');
};

const processDonation = async (donationAmount, beneficiaryId) => {
    // Lógica para procesar la donación
    return `Donation of ${donationAmount} processed for beneficiary ${beneficiaryId}`;
};

module.exports = { validateBeneficiary, processDonation };
