import { BACKEND_URL } from '@env';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator, Alert,
  Button, Image,
  Text,
  View
} from 'react-native';

export default function PlantAI() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  // ✅ Pick image from gallery
  async function pickImage() {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  }

  // ✅ Take photo using camera
  async function snapPhoto() {
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  }

  // ✅ Start recording audio
  async function startRecording() {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return Alert.alert("Microphone permission is required");

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
    } catch (e) {
      console.warn("Recording error:", e);
    }
  }

  // ✅ Stop recording audio
  async function stopRecording() {
    const recording = recordingRef.current;
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    setAudioUri(recording.getURI()!);
    recordingRef.current = null;
  }

  // ✅ Submit to Flask backend
  async function handleAnalyze() {
    if (!imageUri) return Alert.alert('Please select or capture an image.');

    setLoading(true);
    const data = new FormData();

    data.append('image', {
      uri: imageUri,
      name: imageUri.split('/').pop(),
      type: 'image/jpeg'
    } as any);

    if (audioUri) {
      data.append('audio', {
        uri: audioUri,
        name: audioUri.split('/').pop(),
        type: 'audio/webm',
      } as any);
    }

    data.append('language', 'hi');

    try {
      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: data
      });
      const json = await res.json();
      setResponse(json.response ?? json.error ?? 'No response from server');
    } catch (e: any) {
      Alert.alert("Network error", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#0F0D23' }}>
      <Text style={{ color: '#fff', fontSize: 24, marginBottom: 16 }}>🌾 Plant Disease Detector</Text>

      <Button title="📁 Choose from Gallery" onPress={pickImage} disabled={loading} />
      <Button title="📸 Take a Photo" onPress={snapPhoto} disabled={loading} />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 220, height: 220, margin: 16 }} />
      )}

      <Button
        title={recordingRef.current ? "Stop Recording 🎤" : "Record Voice 🎤"}
        onPress={recordingRef.current ? stopRecording : startRecording}
        disabled={loading}
      />

      <Button title="Analyze 🧠" onPress={handleAnalyze} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 20 }} />}

      {response && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>AI says:</Text>
          <Text style={{ color: '#fff', marginTop: 8 }}>{response}</Text>
        </View>
      )}
    </View>
  );
}
