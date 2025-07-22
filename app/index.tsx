import { Redirect } from "expo-router";

console.log("✅ index.tsx is loaded");

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
