
# Wrap Your Portfolio Website Using Capacitor

Okay, let's get you started with the basic Capacitor code to wrap your portfolio website. Below are the essential steps and code snippets.

---


## **Prerequisites**

- **Node.js and npm (or yarn):**  
  Make sure you have Node.js and npm (Node Package Manager) or yarn installed on your system.  
  You can check by running:

  ```bash
  node -v
  npm -v
  # or
  yarn --version
  ```

- **Android Studio:**  
  You'll need Android Studio installed to build and run the Android app on an emulator or a physical device.

---

## **Steps**

### 1. Create a New Capacitor Project

Open your terminal in the directory where you want to create your project and run:

```bash
npm init @capacitor/app
```

The CLI will ask you a few questions:

- **App name:** Choose a name for your app (e.g., `PortfolioApp`)
- **Package ID:** This is your app's unique identifier (e.g., `com.example.portfolioapp`)
- **Web dir:** Enter `.` (dot), since your portfolio is already a built website hosted on Vercel

After answering the questions, Capacitor will initialize a basic project structure.

---

### 2. Add the Android Platform

Navigate into your newly created project directory:

```bash
cd PortfolioApp
```

Then add the Android platform:

```bash
npm install @capacitor/android
npx cap add android 
or
.\node_modules\.bin\cap add android
```

This command will download the necessary Android dependencies and create an `android` folder in your project.

---

```bash
PS D:\New folder\dmsvs_app> npx cap sync android
[warn] Cannot copy web assets from non-existent-folder to android\app\src\main\assets\public
       Web asset directory specified by webDir does not exist. This is not an error because server.url is set in config.
× Creating capacitor.config.json in android\app\src\main\assets - failed!
× copy android - failed!
[error] Error: ENOENT: no such file or directory, open 'D:\New
        folder\dmsvs_app\android\app\src\main\assets\capacitor.config.json'
√ Updating Android plugins in 2.29ms
[info] Found 2 Capacitor plugins for android:
       @capacitor/camera@7.0.1
       @capacitor/splash-screen@7.0.1
× update android - failed!
[error] Error: ENOENT: no such file or directory, open 'D:\New
        folder\dmsvs_app\android\app\src\main\assets\capacitor.plugins.json'
```
The error Cannot copy web assets from non-existent-folder to android\app\src\main\assets\public occurs cuz it's not exist in the directory .

To solve that you need to just create  android\app\src\main\assets\public

The error occurs cuz there no such file as 'D:\New
        folder\dmsvs_app\android\app\src\main\assets\capacitor.config.json' exist in the diectory. 

To solve that issue you have to create a file in the diectory as 'D:\New
        folder\dmsvs_app\android\app\src\main\assets\capacitor.config.json', and copy the content in the existing capacitor.config.json into the 'D:\New
        folder\dmsvs_app\android\app\src\main\assets\capacitor.config.json'



### 3. Configure the `capacitor.config.ts` File

Open the `capacitor.config.ts` file in your project’s root directory and modify it:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.portfolioapp', // Make sure this matches what you entered during initialization
  appName: 'PortfolioApp',
  webDir: '.', // Changed to '.' to point to the root where your website "is"
  bundledWebRuntime: false, // Since your website is hosted, we don't need to bundle a web runtime

  // Optional: Configure the server URL
  server: {
    url: 'https://sravanth-kumar-tulluri.vercel.app/',
    cleartext: true // May be needed for development if you encounter issues with HTTPS
  }
};

export default config;
```

#### Explanation:
- `webDir: '.'`: Points to the root directory where your website resides.
- `bundledWebRuntime: false`: Disables bundling since your site is already hosted.
- `server.url`: Tells Capacitor’s WebView what URL to load.
- `server.cleartext: true`: Useful for development if HTTPS issues occur.

---

### 4. Sync Capacitor

After configuration, sync your project:

```bash
npx cap sync android
```

This will update the Android project with your settings.

---

### 5. Open the Android Project in Android Studio

```bash
npx cap open android
```

This command opens the `android` folder in Android Studio.

---

### 6. Run Your App

In Android Studio:

- **Build:** Go to `Build > Make Project`
- **Run:** Click the green "Run" button or go to `Run > Run 'app'`
- **Select Device:** Choose a connected physical Android device or emulator

Your app should now launch and display your portfolio website.

---

## **Important Considerations**

- **Internet Permission:**  
  Capacitor automatically adds the required permission.

- **Responsiveness:**  
  Make sure your site is mobile-friendly.

- **Native Features:**  
  For native features like camera or GPS, use [Capacitor Plugins](https://capacitorjs.com/docs/plugins).

- **App Icon and Splash Screen:**  
  Customize these in `android/app/src/main/res`.

- **Build for Production:**  
  Use Android Studio tools to generate a release APK or AAB for distribution.

---

For advanced configurations, refer to the [official Capacitor documentation](https://capacitorjs.com/docs).
