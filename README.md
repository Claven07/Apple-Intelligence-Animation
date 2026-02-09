# Apple Intelligence Animation

A beautiful, glowing animation component inspired by Apple Intelligence. Available for **Web**, **React Native**, and **Flutter**.

---

## 🌐 Web (React)

### 1. Setup
Copy the `GlowEffect.tsx` file from `web/src/components/` into your project.

### 2. Usage
Simply import and use the component. It fits the size of its parent container.

```tsx
import { GlowEffect } from './components/GlowEffect';

function App() {
  return (
    <div style={{ width: 300, height: 600, position: 'relative' }}>
      <GlowEffect />
    </div>
  );
}
```

---

## 📱 React Native

### 1. Dependencies
This component uses **Skia** and **Reanimated**. Install them first:

```bash
npm install @shopify/react-native-skia react-native-reanimated
cd ios && pod install
```

### 2. Setup
Copy `GlowEffectNative.tsx` from `native/` into your project.

### 3. Usage
```tsx
import { GlowEffectNative } from './GlowEffectNative';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <GlowEffectNative />
    </View>
  );
};
```

---

## 💙 Flutter

### 1. Setup
Copy `glow_effect.dart` from `flutter/lib/` into your project's `lib` folder.

### 2. Usage
No extra packages required! Just use the `GlowEffect` widget.

```dart
import 'package:flutter/material.dart';
import 'glow_effect.dart';

void main() {
  runApp(MaterialApp(
    home: GlowEffect(),
  ));
}
```

---

## � Project Structure

- **`/web`**: React + Vite project.
- **`/native`**: React Native implementation.
- **`/flutter`**: Flutter implementation.


## 🤝 Contributing

Feel free to open issues or submit PRs if you find optimizations or want to add more configuration options (like custom colors or speed controls).

## 📄 License

This project is open source. Feel free to use it in your own applications.


Dropping code soon in swift for ios developers