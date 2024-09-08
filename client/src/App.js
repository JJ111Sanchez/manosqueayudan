import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [donationAmount, setDonationAmount] = useState('');
    const [beneficiaryId, setBeneficiaryId] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [response, setResponse] = useState('');

    // Función para validar el beneficiario
    const handleValidate = async () => {
        try {
            const result = await axios.post('http://localhost:3000/validate-beneficiary', { medicalHistory });
            setResponse(result.data.isValid ? 'Beneficiary is valid' : 'Beneficiary is not valid');
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    // Función para realizar la donación
    const handleDonate = async (e) => {
        e.preventDefault(); // Prevenir que el formulario recargue la página
        try {
            const result = await axios.post('http://localhost:3000/donate', { donationAmount, beneficiaryId });
            setResponse(result.data.result);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            {/* Encabezado principal con estilo App-header */}
            <header className="App-header">
                <h1>Plataforma de Donación</h1>
                
                {/* Formulario para validar al beneficiario */}
                <div>
                    <h2>Valide Información del Beneficiario</h2>
                    <input
                        type="text"
                        placeholder="Medical History"
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                    />
                    <button onClick={handleValidate}>Validate</button>
                </div>

                {/* Formulario para realizar la donación */}
                <div>
                    <h2>Donate</h2>
                    <form onSubmit={handleDonate}>
                        <input
                            type="text"
                            placeholder="Beneficiary ID"
                            value={beneficiaryId}
                            onChange={(e) => setBeneficiaryId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Donation Amount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                        />
                        <button type="submit">Donate</button>
                    </form>
                </div>

                {/* Respuesta del servidor */}
                <div>{response}</div>
            </header>
        </div>
    );
};

export default App;

