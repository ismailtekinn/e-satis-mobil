import * as FileSystem from 'expo-file-system';
import { PendingDocument } from '../../types/documentsActionType';

const PENDING_DOCS_DIR = FileSystem.documentDirectory + "pendingDocuments/";


const ensurePendingDocsDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(PENDING_DOCS_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(PENDING_DOCS_DIR, { intermediates: true });
  }
};


export const savePendingDocument = async (doc: PendingDocument) => {
  try {
    await ensurePendingDocsDirExists();
    // 2. Dosya adı oluştur
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const customerId = doc.customer?.id ?? "unknown";
    const fileName = `customer_${customerId}_${timestamp}.json`;
    const fileUri = PENDING_DOCS_DIR + fileName;

    // 3. JSON'a çevir ve kaydet
    const json = JSON.stringify(doc, null, 2);
    await FileSystem.writeAsStringAsync(fileUri, json);

    console.log("Belge kaydedildi:", fileUri);
  } catch (error) {
    console.error("Belge kaydedilemedi:", error);
  }
};


export const listPendingDocuments = async () => {
  try {
    console.log("bekleyen belgeyi getirme fonksiyonu çağrıldı")
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "pendingDocuments/");
    console.log("getirilen veri console yazdırılıyor: ", files)
    return files;
  } catch (error) {
    console.error("Klasör okunamadı:", error);
    return [];
  }
};