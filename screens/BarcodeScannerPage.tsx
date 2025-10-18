// import { CameraView,Camera, CameraType, useCameraPermissions } from "expo-camera";
// import { useEffect, useState } from "react";
// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Audio } from 'expo-av';

// interface BarcodeScannerProps {
//   onBarcodeScanned: (data: string) => void;
//   onClose: () => void;
// }

// const BarCodeScanResult: React.FC<BarcodeScannerProps> = ({
//   onBarcodeScanned,
//   onClose,
// }) => {
//   const [facing, setFacing] = useState<CameraType>("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [lastScanned, setLastScanned] = useState<number | null>(null);
//   const scanCooldown = 3000;

// const playBeep = async () => {
//   const { sound } = await Audio.Sound.createAsync(
//     require('../assets/beepsound.mp3')
//   );
//   await sound.playAsync();
// };

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to use the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   const handleBarcodeScanned = async ({
//     data,
//   }: {
//     type: string;
//     data: string;
//   }) => {
//     const now = Date.now();
//     // onBarcodeScanned(data);
//     if (!lastScanned || now - lastScanned > scanCooldown) {
//       setLastScanned(now);
//       playBeep();
//       onBarcodeScanned(data);
//     }
//   };

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//         <Text style={styles.closeButtonText}>X</Text>
//       </TouchableOpacity>
//       <CameraView
//         style={styles.camera}
//         facing={facing}
//         onBarcodeScanned={handleBarcodeScanned}
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             {/* <Text style={styles.text}>Flip Camera</Text> */}
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   message: {
//     textAlign: "center",
//     paddingBottom: 10,
//   },
//   camera: {
//     width: "100%",
//     height: 150,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: "flex-end",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
//   closeButton: {
//     position: "absolute",
//     top: -50,
//     right: 5,
//     zIndex: 1,
//     backgroundColor: "red",
//     padding: 8,
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default BarCodeScanResult;


// cloude 1. çözümü
// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
// import { useEffect, useState, useRef } from "react";
// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Audio } from 'expo-av';

// interface BarcodeScannerProps {
//   onBarcodeScanned: (data: string) => void;
//   onClose: () => void;
// }

// const BarCodeScanResult: React.FC<BarcodeScannerProps> = ({
//   onBarcodeScanned,
//   onClose,
// }) => {
//   const [facing, setFacing] = useState<CameraType>("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [lastScanned, setLastScanned] = useState<number | null>(null);
//   const scanCooldown = 3000;

//   // Çoklu okuma doğrulaması için
//   const scanBuffer = useRef<Map<string, number>>(new Map());
//   const requiredScans = 3; // Aynı barkodun kaç kez okunması gerektiği
//   const bufferTimeout = 1000; // Buffer temizleme süresi (ms)

//   const playBeep = async () => {
//     const { sound } = await Audio.Sound.createAsync(
//       require('../assets/beepsound.mp3')
//     );
//     await sound.playAsync();
//   };

//   // Buffer temizleme
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = Date.now();
//       scanBuffer.current.forEach((timestamp, code) => {
//         if (now - timestamp > bufferTimeout) {
//           scanBuffer.current.delete(code);
//         }
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to use the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   const handleBarcodeScanned = async ({
//     data,
//   }: {
//     type: string;
//     data: string;
//   }) => {
//     const now = Date.now();

//     // Cooldown kontrolü
//     if (lastScanned && now - lastScanned < scanCooldown) {
//       return;
//     }

//     // Geçersiz veya çok kısa barkodları filtrele
//     if (!data || data.trim().length < 3) {
//       return;
//     }

//     // Aynı barkodun birden fazla kez okunmasını bekle
//     const currentCount = scanBuffer.current.get(data) || 0;
//     scanBuffer.current.set(data, now);

//     // İlk okuma
//     if (currentCount === 0) {
//       scanBuffer.current.set(data, now);
//       return;
//     }

//     // İkinci okuma - doğrulama
//     if (now - currentCount < bufferTimeout) {
//       setLastScanned(now);
//       scanBuffer.current.clear(); // Buffer'ı temizle
//       await playBeep();
//       onBarcodeScanned(data);
//     }
//   };

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//         <Text style={styles.closeButtonText}>X</Text>
//       </TouchableOpacity>
//       <CameraView
//         style={styles.camera}
//         facing={facing}
//         onBarcodeScanned={handleBarcodeScanned}
//         barcodeScannerSettings={{
//           barcodeTypes: [
//             "ean13",
//             "ean8",
//             "upc_a",
//             "upc_e",
//             "code128",
//             "code39",
//             "qr"
//           ],
//         }}
//       >
//         <View style={styles.buttonContainer}>
//           <View style={styles.scanGuide}>
//             <View style={styles.scanFrame} />
//             <Text style={styles.scanText}>Barkodu çerçeve içine yerleştirin</Text>
//           </View>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             {/* <Text style={styles.text}>Flip Camera</Text> */}
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   message: {
//     textAlign: "center",
//     paddingBottom: 10,
//   },
//   camera: {
//     width: "100%",
//     height: 150,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: "transparent",
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: "flex-end",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
//   closeButton: {
//     position: "absolute",
//     top: -50,
//     right: 5,
//     zIndex: 1,
//     backgroundColor: "red",
//     padding: 8,
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   scanGuide: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scanFrame: {
//     width: 250,
//     height: 100,
//     borderWidth: 2,
//     borderColor: "white",
//     borderRadius: 8,
//     backgroundColor: "transparent",
//   },
//   scanText: {
//     color: "white",
//     marginTop: 10,
//     fontSize: 14,
//     textAlign: "center",
//   },
// });

// export default BarCodeScanResult;

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

interface BarcodeScannerProps {
  onBarcodeScanned: (data: string) => void;
  onClose: () => void;
}

const BarCodeScanResult: React.FC<BarcodeScannerProps> = ({
  onBarcodeScanned,
  onClose,
}) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [lastScanned, setLastScanned] = useState<number | null>(null);
  const scanCooldown = 3000;

  // Çoklu okuma doğrulaması için
  const scanBuffer = useRef<Map<string, { count: number; timestamp: number }>>(
    new Map()
  );
  const requiredScans = 2; // QR ve barkod için 2 okuma yeterli
  const bufferTimeout = 1500; // Buffer temizleme süresi (ms)

  const playBeep = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/beepsound.mp3")
    );
    await sound.playAsync();
  };

  // EAN13 checksum doğrulama
  const validateEAN13 = (code: string): boolean => {
    if (code.length !== 13) return false;
    if (!/^\d+$/.test(code)) return false;

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(code[i]);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    const checksum = (10 - (sum % 10)) % 10;
    return checksum === parseInt(code[12]);
  };

  // EAN8 checksum doğrulama
  const validateEAN8 = (code: string): boolean => {
    if (code.length !== 8) return false;
    if (!/^\d+$/.test(code)) return false;

    let sum = 0;
    for (let i = 0; i < 7; i++) {
      const digit = parseInt(code[i]);
      sum += i % 2 === 0 ? digit * 3 : digit;
    }
    const checksum = (10 - (sum % 10)) % 10;
    return checksum === parseInt(code[7]);
  };

  // UPC-A checksum doğrulama
  const validateUPCA = (code: string): boolean => {
    if (code.length !== 12) return false;
    if (!/^\d+$/.test(code)) return false;

    let sum = 0;
    for (let i = 0; i < 11; i++) {
      const digit = parseInt(code[i]);
      sum += i % 2 === 0 ? digit * 3 : digit;
    }
    const checksum = (10 - (sum % 10)) % 10;
    return checksum === parseInt(code[11]);
  };

  // Code128 için basit format kontrolü
  const validateCode128 = (code: string): boolean => {
    if (code.length < 6) return false;
    return /^[\x20-\x7E]+$/.test(code);
  };

  // QR kod doğrulama
  const validateQR = (code: string): boolean => {
    if (code.length < 1) return false;
    if (code.length > 4296) return false;
    if (code.trim().length === 0) return false;
    return true;
  };

  // Genel barkod doğrulama
  const validateBarcode = (code: string, type?: string): boolean => {
    console.log("Tarama tipi:", type, "Veri:", code, "Veri uzunluğu:", code.length);
    
    // Boş veri kontrolü
    if (!code || code.trim().length === 0) {
      console.log("Boş veri reddedildi");
      return false;
    }

    // QR kod özel kontrolü - Expo Go'da farklı type değerleri olabilir
    const typeStr = type?.toLowerCase() || "";
    if (typeStr.includes("qr") || type === "256" || type === "org.iso.QRCode") {
      console.log("QR kod olarak algılandı");
      return validateQR(code);
    }

    // Eğer veri çok kısaysa (1-5 karakter) muhtemelen QR veya özel formattır
    // Checksum kontrolü yapma, direkt geçir
    if (code.length < 6) {
      console.log("Kısa veri, QR olabilir, geçiyor");
      return true; // QR kodlar çok kısa olabilir
    }

    // Sürekli tekrar eden karakterleri reddet (sadece barkodlar için)
    if (/^(.)\1+$/.test(code) && code.length < 20) {
      console.log("Tekrar eden karakter deseni reddedildi");
      return false;
    }

    // Barkod tipine göre doğrulama
    if (code.length === 13 && /^\d+$/.test(code)) return validateEAN13(code);
    if (code.length === 8 && /^\d+$/.test(code)) return validateEAN8(code);
    if (code.length === 12 && /^\d+$/.test(code)) return validateUPCA(code);
    if (typeStr.includes("code128")) return validateCode128(code);

    // Diğer formatlar için - daha esnek kontrol
    console.log("Genel format olarak kabul edildi");
    return true; // QR kodlar için esnek ol
  };

  // Buffer temizleme
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      scanBuffer.current.forEach((value, code) => {
        if (now - value.timestamp > bufferTimeout) {
          scanBuffer.current.delete(code);
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Kamera kullanımı için izin gerekli</Text>
        <Button onPress={requestPermission} title="İzin Ver" />
      </View>
    );
  }

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    const now = Date.now();

    console.log("Tarama algılandı - Tip:", type, "Veri:", data);

    // Cooldown kontrolü
    if (lastScanned && now - lastScanned < scanCooldown) {
      return;
    }

    // Trim ve normalizasyon
    const normalizedData = data.trim();

    // Barkod doğrulama
    if (!validateBarcode(normalizedData, type)) {
      console.log("Geçersiz kod reddedildi:", normalizedData, "Tip:", type);
      return;
    }

    // Buffer kontrolü ve sayma
    const existing = scanBuffer.current.get(normalizedData);

    if (!existing) {
      scanBuffer.current.set(normalizedData, { count: 1, timestamp: now });
      console.log("İlk okuma kaydedildi");
      return;
    }

    // Zaman aşımı kontrolü
    if (now - existing.timestamp > bufferTimeout) {
      scanBuffer.current.set(normalizedData, { count: 1, timestamp: now });
      console.log("Zaman aşımı, okuma sıfırlandı");
      return;
    }

    // Sayacı artır
    const newCount = existing.count + 1;
    scanBuffer.current.set(normalizedData, {
      count: newCount,
      timestamp: existing.timestamp,
    });

    // Yeterli okuma sayısına ulaşıldı mı?
    if (newCount >= requiredScans) {
      setLastScanned(now);
      scanBuffer.current.clear();
      await playBeep();
      onBarcodeScanned(normalizedData);
      console.log("Kod başarıyla okundu:", normalizedData);
    } else {
      console.log(`Okuma sayısı: ${newCount}/${requiredScans}`);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code128",
            "code39",
          ],
        }}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.scanGuide}>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <Text style={styles.scanText}>
              Barkod veya QR kodun tamamını çerçeve içine yerleştirin
            </Text>
            <Text style={styles.scanSubtext}>
              Kod net görünene kadar bekleyin
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            {/* <Text style={styles.text}>Flip Camera</Text> */}
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: -50,
    right: 5,
    zIndex: 1,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scanGuide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 280,
    height: 140,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00FF00",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanText: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scanSubtext: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    opacity: 0.8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default BarCodeScanResult;