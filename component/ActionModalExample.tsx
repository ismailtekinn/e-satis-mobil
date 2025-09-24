// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// type Props = {
//   onClose: () => void;
// };
// type IconName =
//   | "trash-outline"
//   | "pause-outline"
//   | "download-outline"
//   | "pencil-outline";

// type MenuItem = {
//   title: string;
//   action: () => void;
//   icon: IconName;
// };
// export default function ActionModalExample({ onClose }: Props) {
//   const menuItems: MenuItem[] = [
//     {
//       title: "Belge İptali",
//       action: () => console.log("Belge İptal"),
//       icon: "trash-outline", // artık emoji değil
//     },
//     {
//       title: "Belgeyi Beklemeye Al",
//       action: () => console.log("Beklemeye Al"),
//       icon: "pause-outline",
//     },
//     {
//       title: "Bekleyen Belgeyi Getir",
//       action: () => console.log("Bekleyen Belgeyi Getir"),
//       icon: "download-outline",
//     },
//     {
//       title: "Belge Düzenle",
//       action: () => console.log("Belge Düzenle"),
//       icon: "pencil-outline",
//     },
//   ];

//   return (
//     <View style={styles.modalContent}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Menü işlem</Text>
//         <Text style={styles.subtitle}>Yapmak istediğiniz işlemi seçin</Text>
//       </View>

//       {/* Menu Grid */}
//       <View style={styles.grid}>
//         {menuItems.map((item: MenuItem, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.card]}
//             onPress={item.action}
//             activeOpacity={0.7}
//           >
//             <View style={styles.cardHeader}>
//               {/* <Text style={styles.icon}>{item.icon}</Text> */}
//               <Ionicons
//                 name={item.icon}
//                 size={28}
//                 color="#00D4FF"
//                 style={styles.icon}
//               />
//               <View style={[styles.colorIndicator]} />
//             </View>
//             <Text style={styles.cardTitle}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Close Button */}
//       <TouchableOpacity
//         onPress={onClose}
//         style={styles.closeBtn}
//         activeOpacity={0.8}
//       >
//         <View style={styles.closeBtnContent}>
//           <Ionicons name="close" size={24} color="#fff" />
//           {/* <Text style={styles.closeBtnIcon}>✕</Text> */}
//           <Text style={styles.closeBtnText}>KAPAT</Text>
//           //{" "}
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 24,
//     borderRadius: 16,
//     width: "90%",
//     maxWidth: 400,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 20,
//     elevation: 10,
//   },

//   header: {
//     marginBottom: 24,
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2c3e50",
//     marginBottom: 4,
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#7f8c8d",
//     textAlign: "center",
//   },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },

//   card: {
//     width: "47%",
//     marginBottom: 12,
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: "#f8f9fa",
//     borderLeftWidth: 4,
//     borderColor: "#e9ecef",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginBottom: 8,
//   },

//   colorIndicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },

//   cardTitle: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#2c3e50",
//     lineHeight: 18,
//   },

//   closeBtn: {
//     backgroundColor: "#e74c3c",
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#e74c3c",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   closeBtnContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   closeBtnText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   icon: {
//     fontSize: 24, // istediğin boyut
//     marginRight: 8, // text ve renk göstergesi arasına boşluk
//   },
// });

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = { onClose: () => void };
type IconName =
  | "trash-outline"
  | "pause-outline"
  | "download-outline"
  | "pencil-outline";

type MenuItem = {
  title: string;
  action: () => void;
  icon: IconName;
  color: string;
};

export default function ActionModalExample({ onClose }: Props) {
  const menuItems: MenuItem[] = [
    {
      title: "Belge İptali",
      action: () => console.log("Belge İptal"),
      icon: "trash-outline",
      color: "#FF6B6B",
    },
    {
      title: "Belgeyi Beklemeye Al",
      action: () => console.log("Beklemeye Al"),
      icon: "pause-outline",
       color: "#F7B731",
    },
    {
      title: "Bekleyen Belgeyi Getir",
      action: () => console.log("Bekleyen Belgeyi Getir"),
      icon: "download-outline",
       color: "#34C759",
    },
    {
      title: "Belge Düzenle",
      action: () => console.log("Belge Düzenle"),
      icon: "pencil-outline",
      color: "#00D4FF",
    },
  ];

  return (
    <View style={styles.modalContent}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconWrap}>
          <Ionicons name="apps-outline" size={22} color="#0F172A" />
        </View>
        <Text style={styles.title}>Menü İşlem</Text>
        <Text style={styles.subtitle}>Yapmak istediğiniz işlemi seçin</Text>
      </View>

      {/* Menu Grid */}
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={item.action}
            android_ripple={{ color: "#E5E7EB", borderless: false }}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { borderColor: item.color }]}>
                <View
                  style={[
                    styles.iconBadgeInner,
                    { backgroundColor: item.color + "22" },
                  ]}
                />
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={item.color}
                  style={styles.icon}
                />
              </View>
            </View>
            <Text numberOfLines={2} style={styles.cardTitle}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Close Button */}
      <TouchableOpacity
        onPress={onClose}
        style={styles.closeBtn}
        activeOpacity={0.85}
      >
        <View style={styles.closeBtnContent}>
          <Ionicons name="close" size={20} color="#fff" />
          <Text style={styles.closeBtnText}>Kapat</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    width: "90%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },

  header: {
    alignItems: "center",
    marginBottom: 18,
  },
  headerIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  card: {
    width: "48%",
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#EEF2F7",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  iconBadge: {
    height: 40,
    width: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  iconBadgeInner: {
    position: "absolute",
    inset: 0,
  },
  icon: {
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 18,
  },

  closeBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#EF4444",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  closeBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  } as any,
  closeBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// type Props = {
//   onClose: () => void;
// };
// type IconName =
//   | "trash-outline"
//   | "pause-outline"
//   | "download-outline"
//   | "pencil-outline";

// type MenuItem = {
//   title: string;
//   action: () => void;
//   color: string;
//   icon: IconName;
// };

// const { width, height } = Dimensions.get("window");
// export default function ActionModalExample({ onClose }: Props) {
//   const menuItems: MenuItem[] = [
//     {
//       title: "Belge İptali",
//       action: () => console.log("Belge İptal"),
//       color: "#00D4FF",
//       icon: "trash-outline", // artık emoji değil
//     },
//     {
//       title: "Belgeyi Beklemeye Al",
//       action: () => console.log("Beklemeye Al"),
//       color: "#00FF88",
//       icon: "pause-outline",
//     },
//     {
//       title: "Bekleyen Belgeyi Getir",
//       action: () => console.log("Bekleyen Belgeyi Getir"),
//       color: "#FFB800",
//       icon: "download-outline",
//     },
//     {
//       title: "Belge Düzenle",
//       action: () => console.log("Belge Düzenle"),
//       color: "#FF6B6B",
//       icon: "pencil-outline",
//     },
//   ];

//   return (
//     <View style={styles.overlay}>
//       <View style={styles.modalContent}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerLine} />
//           <Text style={styles.title}>Menü İşlem</Text>
//           <Text style={styles.subtitle}>Yapmak istediğiniz işlemi seçiniz</Text>
//         </View>

//         {/* Menu Grid */}
//         <View style={styles.grid}>
//           {menuItems.map((item: MenuItem, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.card}
//               onPress={item.action}
//               activeOpacity={0.8}
//             >
//               {/* Glow effect */}
//               <View
//                 style={[
//                   styles.glowEffect,
//                   { backgroundColor: item.color + "15" },
//                 ]}
//               />

//               {/* Card content */}
//               <View style={styles.cardContent}>
//                 <View style={styles.iconContainer}>
//                   {/* <Text style={styles.icon}>{item.icon}</Text> */}
//                   <Ionicons
//                     name={item.icon}
//                     size={28}
//                     color="#fff"
//                     style={styles.icon}
//                   />
//                 </View>
//                 <Text style={styles.cardTitle}>{item.title}</Text>

//                 {/* Accent line */}
//                 <View
//                   style={[styles.accentLine, { backgroundColor: item.color }]}
//                 />
//               </View>

//               {/* Hover/Active indicator */}
//               <View
//                 style={[styles.activeIndicator, { borderColor: item.color }]}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Bottom section */}
//         <View style={styles.bottomSection}>
//           <View style={styles.divider} />
//           <TouchableOpacity
//             onPress={onClose}
//             style={styles.closeBtn}
//             activeOpacity={0.7}
//           >
//             <View style={styles.closeBtnContent}>
//               <Ionicons name="close" size={24} color="#fff" />
//               {/* <Text style={styles.closeBtnIcon}>✕</Text> */}
//               <Text style={styles.closeBtnText}>KAPAT</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.85)", // Şeffaf siyah overlay
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // modalContent: {
//   //   backgroundColor: "#1A1A2E", // Koyu lacivert/siyah
//   //   padding: 28,
//   //   borderRadius: 20,
//   //   width: "92%",
//   //   maxWidth: 420,
//   //   shadowColor: "#00D4FF",
//   //   shadowOffset: {
//   //     width: 0,
//   //     height: 0,
//   //   },
//   //   shadowOpacity: 0.3,
//   //   shadowRadius: 15,
//   //   elevation: 20,
//   //   borderWidth: 1,
//   //   borderColor: "rgba(0, 212, 255, 0.2)", // Hyundai mavi kenar
//   // },

//   modalContent: {
//     backgroundColor: "#1A1A2E",
//     padding: 28,
//     borderRadius: 20,
//     width: "92%",
//     maxWidth: 420,
//     height: "90%",

//     // Neon glow
//     shadowColor: "#00D4FF",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8, // artırıldı
//     shadowRadius: 20, // daha büyük glow
//     elevation: 25, // Android glow için

//     borderWidth: 2, // biraz daha belirgin
//     borderColor: "rgba(0, 212, 255, 0.4)", // neon mavi kenar
//   },

//   header: {
//     marginBottom: 32,
//     alignItems: "center",
//   },

//   headerLine: {
//     width: 60,
//     height: 3,
//     backgroundColor: "#00D4FF",
//     borderRadius: 2,
//     marginBottom: 16,
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     marginBottom: 8,
//     letterSpacing: 1.2,
//   },

//   subtitle: {
//     fontSize: 13,
//     color: "#A0A0B8",
//     textAlign: "center",
//     opacity: 0.8,
//   },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginBottom: 28,
//   },

//   card: {
//     width: "47%",
//     // height: 100,
//     height: height * 0.13,
//     marginBottom: 16,
//     borderRadius: 16,
//     backgroundColor: "#16213E", // Daha koyu lacivert
//     position: "relative",
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },

//   glowEffect: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     borderRadius: 16,
//   },

//   cardContent: {
//     flex: 1,
//     padding: 14,
//     justifyContent: "space-between",
//     zIndex: 1,
//   },

//   iconContainer: {
//     alignSelf: "flex-end",
//   },
//   icon: {
//     fontSize: 28, // ikon boyutu (emoji veya simge)
//     width: 36, // container genişliği
//     height: 36, // container yüksekliği
//     textAlign: "center", // emoji ortalanır
//     textAlignVertical: "center", // dikey ortalama (Android)
//     color: "#FFFFFF", // ikon rengi (emoji renk değişmez)
//     backgroundColor: "rgba(255, 255, 255, 0.05)", // hafif arka plan

//     borderRadius: 18, // yuvarlak kutu
//     overflow: "hidden",
//   },
//   iconSvg: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },

//   cardTitle: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#FFFFFF",
//     lineHeight: 16,
//     marginTop: 8,
//   },

//   accentLine: {
//     width: "100%",
//     height: 2,
//     borderRadius: 1,
//     marginTop: 8,
//     opacity: 0.8,
//   },

//   activeIndicator: {
//     position: "absolute",
//     top: -1,
//     left: -1,
//     right: -1,
//     bottom: -1,
//     borderRadius: 16,
//     borderWidth: 2,
//     opacity: 0,
//   },

//   bottomSection: {
//     position: "absolute",
//     bottom: "15%", // modalın altından boşluk
//     left: 0,
//     right: 0,
//     alignItems: "center",
//   },
//   divider: {
//     width: "80%",
//     height: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     marginBottom: 20,
//   },

//   closeBtn: {
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 15,
//     // borderWidth: 1,
//     minWidth: 140,
//     // borderColor: "rgba(255, 255, 255, 0.2)",

//     shadowColor: "#00D4FF",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8, // artırıldı
//     shadowRadius: 20, // daha büyük glow
//     elevation: 25, // Android glow için
//     borderWidth: 2, // biraz daha belirgin
//     borderColor: "rgba(0, 212, 255, 0.4)", // neon mavi kenar
//   },

//   closeBtnContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   closeBtnIcon: {
//     color: "#A0A0B8",
//     fontSize: 16,
//     marginRight: 8,
//   },

//   closeBtnText: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//     fontSize: 13,
//     letterSpacing: 0.8,
//   },
// });
