# Apple Intelligence Animation

A beautiful, glowing animation component inspired by Apple Intelligence. Available for **Web**, **React Native**, **Flutter**, and **iOS (SwiftUI)**.


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

## 🍎 iOS (SwiftUI)

### 1. Setup
Copy the `iOS.swift` file from the `iOS/` folder into your project.

### 2. Usage
Simply use the `GlowEffect` view within your SwiftUI hierarchy.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            GlowEffect()
        }
    }
}
```

---

## 📂 Project Structure

- **`/web`**: React + Vite project.
- **`/native`**: React Native implementation.
- **`/flutter`**: Flutter implementation.
- **`/iOS`**: Native iOS implementation in SwiftUI.


## 🤝 Contributing

Feel free to open issues or submit PRs if you find optimizations or want to add more configuration options (like custom colors or speed controls). Read the Contribution.md file for more information.

## ⚖️ Legal Disclaimer

This project is an independent creation and is **not affiliated with, endorsed by, or associated with Apple Inc.** in any way. "Apple Intelligence" is a trademark of Apple Inc. This project is for educational and demonstrative purposes only, showcasing how to recreate similar animation effects across different platforms.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

⭐️ If this project helped you, please consider giving it a star!


