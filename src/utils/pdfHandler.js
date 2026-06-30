import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export const saveAndSharePDF = async (doc, filename) => {
    try {
        if (Capacitor.isNativePlatform()) {
            // Dapatkan output PDF dalam bentuk string base64
            const pdfDataUri = doc.output('datauristring');
            const pdfBase64 = pdfDataUri.split(',')[1];
            
            // Simpan sementara ke folder Cache
            const savedFile = await Filesystem.writeFile({
                path: filename,
                data: pdfBase64,
                directory: Directory.Cache,
            });
            
            // Munculkan dialog native untuk membagikan/membuka/menyimpan file
            await Share.share({
                title: filename,
                url: savedFile.uri,
                dialogTitle: 'Buka atau Simpan PDF'
            });
        } else {
            // Fallback untuk web browser
            doc.save(filename);
        }
    } catch (error) {
        console.error('Error saat menyimpan atau membagikan PDF:', error);
        alert('Gagal menyimpan atau membagikan PDF. Silakan periksa izin aplikasi.');
    }
};
