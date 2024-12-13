import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Link } from "react-router-dom";
import axios from 'axios'; // To send HTTP requests
import '../CSS file/CharityDonations.css';

const CharityDonations = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [donationComplete, setDonationComplete] = useState(false); // To track donation status

    const generateQRCode = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        const paymentDetails = `upi://pay?pa=tejasparuchuru@okaxis&pn=${encodeURIComponent(
            name
        )}&am=${amount}&cu=INR&tn=Donation for Charity`;

        try {
            const qrCodeUrl = await QRCode.toDataURL(paymentDetails);
            setQrCode(qrCodeUrl);
            setDonationComplete(true); // Mark donation as complete when QR code is generated
        } catch (error) {
            console.error("Error generating QR Code:", error);
            alert("Failed to generate QR Code. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the donation data to the backend only if donation is complete
        if (!donationComplete) {
            alert("Please complete the donation first.");
            return;
        }

        try {
            const paymentData = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                amount: parseFloat(amount),
            };

            const response = await axios.post('https://backend-production-7345.up.railway.app/api/payments/add', paymentData);

            if (response.status === 200) {
                alert("Thank you for your contribution!");
            } else {
                alert("There was an issue submitting your donation. Please try again.");
            }

            // Clear the form after submission
            setName('');
            setEmail('');
            setPhoneNumber('');
            setAmount('');
            setQrCode('');
            setDonationComplete(false); // Reset donation status

        } catch (error) {
            console.error("Error submitting payment data:", error);
            alert("Failed to submit your donation. Please try again.");
        }
    };

    return (
        <div className="charity-container">
            <div className="health-header">
        <Link to="/home" className="back-home-button">
          Back to Home
        </Link>
      </div>
            <h1>Make a Difference Today</h1>
            <p>Your contributions can change lives and empower victims of domestic violence.</p>

            <form className="donation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Donation Amount (₹)</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>

                <button type="button" onClick={generateQRCode}>
                    Generate QR Code
                </button>

                {donationComplete && (
                    <button type="submit">Submit Donation</button>
                )}
            </form>

            {qrCode && (
                <div className="qr-code-section">
                    <h2>Scan to Donate</h2>
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

export default CharityDonations;
