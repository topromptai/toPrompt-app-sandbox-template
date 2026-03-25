#!/usr/bin/env node

/**
 * Reset the boilerplate project to a blank state.
 *
 * Moves the existing src/ directory to src-example/ (or deletes it),
 * then creates a fresh src/app/ with a minimal index.tsx and _layout.tsx.
 *
 * You can remove the `reset-project` script from package.json after running this.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const srcDir = path.join(root, "src");
const exampleDir = path.join(root, "src-example");
const newAppDir = path.join(root, "src", "app");

const indexContent = `import { View } from 'react-native';
import { Text } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit src/app/index.tsx to get started.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const resetProject = async (userInput) => {
  try {
    if (fs.existsSync(srcDir)) {
      if (userInput === "y") {
        await fs.promises.rename(srcDir, exampleDir);
        console.log("➡️  /src moved to /src-example for reference.");
      } else {
        await fs.promises.rm(srcDir, { recursive: true, force: true });
        console.log("❌ /src deleted.");
      }
    }

    // Create fresh src/app directory
    await fs.promises.mkdir(newAppDir, { recursive: true });
    console.log("\n📁 New /src/app directory created.");

    await fs.promises.writeFile(path.join(newAppDir, "index.tsx"), indexContent);
    console.log("📄 src/app/index.tsx created.");

    await fs.promises.writeFile(path.join(newAppDir, "_layout.tsx"), layoutContent);
    console.log("📄 src/app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log("1. Run `npx expo start` to start the dev server.");
    console.log("2. Edit src/app/index.tsx to build your screen.");
    if (userInput === "y") {
      console.log("3. Reference /src-example for the original boilerplate code.");
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
};

rl.question(
  "Move existing src/ to src-example/ for reference? (Y/n): ",
  (answer) => {
    const userInput = (answer.trim().toLowerCase() || "y");
    if (userInput === "y" || userInput === "n") {
      resetProject(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Enter 'Y' or 'N'.");
      rl.close();
    }
  }
);
