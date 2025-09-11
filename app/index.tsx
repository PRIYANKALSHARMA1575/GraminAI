import { Redirect } from "expo-router";
import React from "react";

console.log("✅ index.tsx is loaded");

export default function StartPage() {
  return <Redirect href="/login" />;
}