import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const API_URL = "https://127.0.0.1:5000";

export default async function VerifyOtpScreen() {
    const [otpCode, setOtpCode] = useState('');
    const router = useRouter();
    const { mobileNumber } = useLocalSearchParams(); // Gets the mobile number passed from the login screen

    const handleVerify = async () => {
        if (otpCode.length !== 6) {
            Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
            return;
        }
    }
    try {
        const response = await fetch(`${API_URL}/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile_number : mobileNumber, otp_code : otpCode }),
        });

        const data = await response.json();
        if(response.ok){
            Alert.alert("Sucess!", data.message);
            // when login is successful, it navifates to the home screen
            router.replace('/(tabs)');
        } else {
            Alert.alert('Login Failed', data.error || 'Something went wrong.');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
    }
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.subtitle}>Enter the OTP sent to +91 {mobileNumber}</Text>

            <TextInput
            style={styles.input}
            placeholder="6-Digit OTP"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            maxLength={6}
            value={otpCode}
            onChangeText={setOtpCode}
            />

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify and Log In</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
}

// Using the same styles as the login screen for consistency
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0b0',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#2a2a3e',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4a4a5e',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3a9fbf',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});